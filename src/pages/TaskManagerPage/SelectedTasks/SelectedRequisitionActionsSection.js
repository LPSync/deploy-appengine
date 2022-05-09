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
  TaskCancelButton,
  TaskRejectButton,
} from "./components/TaskButtons";
import {NotesTextField} from "../../../components/inputs/NotesTextField";
import ActionSection from "./components/ActionSection";
import {logOptions} from "../../../data/helper/helpers";

const SelectedRequisitionActionsSection = ({
  onSubmitted,
  selectedTaskData,
  handleClose,
  selfCreatedTask,
}) => {
  const history = useHistory();
  const {authUser, permRequisitionApproveTasks, permRequisitionRejectTasks} =
    useContext(AuthUserContext);

  const permRequisitionApproveTasksUpd =
    permRequisitionApproveTasks &&
    selectedTaskData?.taskStatus !== TaskStatuses.COMPLETE;

  const {APPROVED, CANCELLED, REJECTED} = ApprovalStatuses;

  const showCancelButton =
    !selectedTaskData?.requisitionTask?.reqFulfilled &&
    (selectedTaskData?.taskStatus === TaskStatuses.PENDING ||
      selectedTaskData?.taskStatus === TaskStatuses.COMPLETE);
  const showApproveButton =
    selectedTaskData.taskStatus === TaskStatuses.PENDING;
  const showRejectButton =
    selectedTaskData.taskStatus !== TaskStatuses.COMPLETE;

  const [status, setStatus] = useState(null);
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
      `[${selectedTaskData.requisitionTask.reqType}, ${selectedTaskData.requisitionTask.reqBusinessUnit}, ${selectedTaskData.requisitionTask.reqDepartment}]; ` +
      `${info}`
    );
  };

  const addApproval = (id, status, approvalStatus, approvalInfo) => {
    addTaskApproval({
      variables: {
        id: id,
        taskType: TaskTypes.REQUISITION,
        taskStatus: status,
        taskApprovalStatus: approvalStatus,
        input: approvalInfo,
      },
    });
  };

  const checkStatus = (statuses) => {
    return statuses.includes(status);
  };

  const btnClick = (status) => {
    setStatus(status);
  };

  const handleSubmit = () => {
    if (rejectedNotes?.length > 0) {
      setIsRejectedError(false);
    } else {
      if (checkStatus([APPROVED])) {
        setIsRejectedError(false);
      } else {
        return setIsRejectedError(true);
      }
    }
    const id = parseInt(selectedTaskData.id);
    let logOperation = null;
    let logInfo = null;

    switch (status) {
      case REJECTED:
      case CANCELLED:
        const isRejected = checkStatus([REJECTED]);
        const approvalStatus = isRejected ? REJECTED : CANCELLED;
        logOperation = isRejected ? "Rejected" : "Cancelled";
        const logInfoRejected = `rejectedBy: ${authUser.profile.userName}; rejectMsg: ${rejectedNotes}`;
        const logInfoCancelled = `rejectedBy: ${authUser.profile.userName}; rejectMsg: ${rejectedNotes}`;
        isRejected ? (logInfo = logInfoRejected) : (logInfo = logInfoCancelled);
        addApproval(id, TaskStatuses.CANCELLED, approvalStatus, {
          approvalStage: 0,
          approvalStatus,
          approvalNote: rejectedNotes,
        });
        break;
      case APPROVED:
        logOperation = "Approved";
        logInfo = `approvedBy: ${authUser.profile.userName};`;
        addApproval(id, TaskStatuses.COMPLETE, APPROVED, {
          approvalStage: 1,
          approvalStatus: TaskStatuses.COMPLETE,
        });
        break;
      default:
        setIsRejectedError(true);
        break;
    }
    createLog(createLogDescription(logOperation, logInfo));
    handleCloseAfterSubmit();
  };

  useEffect(() => {
    scrollDown();
  }, [status]);

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
                {permRequisitionApproveTasksUpd ? (
                  <>
                    <strong>Pending Financial Approval</strong>
                    <br />
                    If you approve and submit, the task will be complete. If you
                    reject, a rejection note is required before you submit .
                  </>
                ) : (
                  <>
                    If you cancel, a cancellation note is required before you
                    submit .
                  </>
                )}
              </>
            }
          >
            {permRequisitionApproveTasksUpd && showApproveButton && (
              <TaskApproveButton
                isApproved={checkStatus([APPROVED])}
                handleClick={() => {
                  btnClick(APPROVED);
                }}
              />
            )}
            {permRequisitionRejectTasks && showRejectButton && (
              <TaskRejectButton
                isRejected={checkStatus([REJECTED])}
                handleClick={() => {
                  btnClick(REJECTED);
                }}
              />
            )}
            {selfCreatedTask && showCancelButton && (
              <TaskCancelButton
                isCancelled={checkStatus([CANCELLED])}
                handleClick={() => {
                  btnClick(CANCELLED);
                }}
              />
            )}
          </ActionSection>

          {checkStatus([REJECTED, CANCELLED]) && (
            <ActionSection>
              <NotesTextField
                id="rejection-notes"
                placeholder={`${
                  checkStatus([REJECTED]) ? "Rejection" : "Cancellation"
                } Reason (required)`}
                error={isRejectedError}
                value={rejectedNotes}
                onValueChange={setRejectedNotes}
              />
            </ActionSection>
          )}
          {checkStatus([REJECTED, CANCELLED, APPROVED]) && (
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
)(memo(SelectedRequisitionActionsSection));
