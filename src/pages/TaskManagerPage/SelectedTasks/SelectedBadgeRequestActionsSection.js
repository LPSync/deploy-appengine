import React, {memo, useContext, useEffect, useState} from "react";
import TaskSection from "./components/TaskSection";
import {Container, Divider} from "@material-ui/core";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import {useMutation} from "@apollo/client";
import {ADD_TASK_APPROVAL} from "../../../operations/mutations/addTaskApproval";
import handleError from "../../../data/handleError";
import {CREATE_LOG_ENTRY} from "../../../operations/mutations/createLogEntry";
import TaskTypes from "../../../data/constants/TaskTypes";
import TaskStatuses from "../../../data/constants/TaskStatuses";
import ApprovalStatuses from "../../../data/constants/ApprovalStatuses";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {
  SubmitApprovalButton,
  TaskApproveButton,
  TaskRejectButton,
} from "./components/TaskButtons";
import {NotesTextField} from "../../../components/inputs/NotesTextField";
import ActionSection from "./components/ActionSection";
import {logOptions} from "../../../data/helper/helpers";

const SelectedBadgeRequestActionsSection = ({
  onSubmitted,
  selectedTaskData,
  handleClose,
}) => {
  const history = useHistory();
  const {authUser, permRequisitionApproveTasks, permRequisitionRejectTasks} =
    useContext(AuthUserContext);

  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isRejectedError, setIsRejectedError] = useState(false);
  const [rejectedNotes, setRejectedNotes] = useState("");

  const [addTaskApproval] = useMutation(ADD_TASK_APPROVAL, {
    onError: (error) => handleError(error)(history),
  });

  const handleCloseAfterSubmit = () => {
    handleClose();
    onSubmitted();
  };
  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const createLog = (description) => {
    createLogEntry(logOptions(description));
  };

  const createLogDescription = (operation, info) => {
    return (
      `Task ${operation} >> Task ID: ${selectedTaskData.id} ` +
      `[${selectedTaskData.badgeRequestTask.badgeRequestName}, ${selectedTaskData.badgeRequestTask.badgeRequestType}]; ` +
      `${info}`
    );
  };

  const addApproval = (id, status, approvalStatus, approvalInfo) => {
    addTaskApproval({
      variables: {
        id: id,
        taskType: TaskTypes.BADGE_REQUEST,
        taskStatus: status,
        taskApprovalStatus: approvalStatus,
        input: approvalInfo,
      },
    });
  };

  const approveBtnOnClick = () => {
    setIsApproved(true);
    setIsRejected(false);
  };

  const rejectBtnOnClick = () => {
    setIsApproved(false);
    setIsRejected(true);
  };

  const handleSubmit = () => {
    if (isRejected && rejectedNotes?.length === 0) {
      setIsRejectedError(true);
    } else if (isRejected && rejectedNotes?.length > 0) {
      setIsRejectedError(false);
      const id = parseInt(selectedTaskData.id);
      const approvalStatus = ApprovalStatuses.REJECTED;
      const approvalInfo = {
        approvalStage: 0,
        approvalStatus,
        approvalNote: rejectedNotes,
      };
      addApproval(id, TaskStatuses.CANCELLED, approvalStatus, approvalInfo);
      createLog(
        createLogDescription(
          "Rejected",
          `rejectedBy: ${authUser.profile.userName}; rejectMsg: ${rejectedNotes}`
        )
      );
      handleCloseAfterSubmit();
    }
    if (isApproved) {
      if (selectedTaskData.taskStatus === TaskStatuses.PENDING) {
        const id = parseInt(selectedTaskData.id);
        const approvalStatus = ApprovalStatuses.APPROVED;
        const approvalInfo = {
          approvalStage: 1,
          approvalStatus,
        };
        addApproval(id, TaskStatuses.COMPLETE, approvalStatus, approvalInfo);
        createLog(
          createLogDescription(
            "Approved",
            `approvedBy: ${authUser.profile.userName};`
          )
        );
        handleCloseAfterSubmit();
      }
    }
  };

  useEffect(() => {
    scrollDown();
  }, [isRejected, isApproved]);

  const scrollDown = () => {
    const taskWindow = document.getElementById("selected-task-window");
    taskWindow.scroll(0, taskWindow.scrollHeight);
  };

  return (
    <TaskSection title="Task Actions">
      <Container>
        <div>
          <ActionSection
            text={
              <>
                <strong>Pending Approval</strong>
                <br />
                If you approve and submit, the task will be complete. If you
                reject, a rejection note is required before you submit .
              </>
            }
          >
            {permRequisitionApproveTasks && (
              <TaskApproveButton
                isApproved={isApproved}
                handleClick={approveBtnOnClick}
              />
            )}
            {permRequisitionRejectTasks && (
              <TaskRejectButton
                isRejected={isRejected}
                handleClick={rejectBtnOnClick}
              />
            )}
          </ActionSection>

          {isRejected && (
            <ActionSection>
              <NotesTextField
                id="rejection-notes"
                placeholder="Rejection Reason (required)"
                error={isRejectedError}
                value={rejectedNotes}
                onValueChange={setRejectedNotes}
              />
            </ActionSection>
          )}
          {(isApproved || isRejected) && (
            <SubmitApprovalButton handleSubmit={handleSubmit} />
          )}
        </div>
      </Container>

      <Divider />
    </TaskSection>
  );
};

export default connect(
  (state) => ({selectedTaskData: state.taskManager.get("selectedTaskData")}),
  {}
)(memo(SelectedBadgeRequestActionsSection));
