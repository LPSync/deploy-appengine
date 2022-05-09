import React, {memo, useContext, useState} from "react";
import {Box, Container, Divider} from "@material-ui/core";
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
import {NotesTextField} from "../../../components/inputs/NotesTextField";
import {logOptions} from "../../../data/helper/helpers";
import TaskSection from "../../TaskManagerPage/SelectedTasks/components/TaskSection";
import ActionSection from "../../TaskManagerPage/SelectedTasks/components/ActionSection";
import {
  SubmitApprovalButton,
  TaskCancelButton,
} from "../../TaskManagerPage/SelectedTasks/components/TaskButtons";

const SelectedRequisitionActionsSection = ({
  onSubmitted,
  selectedTaskData,
  handleClose,
  selfCreatedTask,
}) => {
  const history = useHistory();
  const {authUser} = useContext(AuthUserContext);
  const [cancelledNotes, setCancelledNotes] = useState("");
  const [isCancelledError, setIsCancelledError] = useState(false);
  const [status, setStatus] = useState(null);
  const {CANCELLED} = ApprovalStatuses;

  const showCancelButton =
    !selectedTaskData?.requisitionTask?.reqFulfilled &&
    (selectedTaskData?.taskStatus === TaskStatuses.PENDING ||
      selectedTaskData?.taskStatus === TaskStatuses.COMPLETE);

  const [addTaskApproval] = useMutation(ADD_TASK_APPROVAL, {
    onCompleted() {
      onSubmitted("req");
    },
    onError: (error) => handleError(error)(history),
  });

  const checkStatus = (statuses) => {
    return statuses.includes(status);
  };

  const btnClick = (status) => {
    setStatus(status);
  };

  const handleCloseAfterSubmit = () => {
    handleClose();
    onSubmitted();
    setIsCancelledError(false);
    setCancelledNotes("");
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

  const handleCancel = () => {
    if (cancelledNotes?.trim().length === 0) {
      setIsCancelledError(true);
    } else {
      setIsCancelledError(false);
      const id = parseInt(selectedTaskData.id);
      const taskStatus = TaskStatuses.CANCELLED;
      const approvalStatus = ApprovalStatuses.CANCELLED;
      const approvalInfo = {
        approvalStage: 0,
        approvalNote: cancelledNotes,
        approvalStatus,
      };

      addApproval(id, taskStatus, approvalStatus, approvalInfo);
      createLog(
        createLogDescription(
          "Cancelled",
          `cancelledBy: ${authUser.profile.userName}; cancelledMsg: ${cancelledNotes}`
        )
      );
      handleCloseAfterSubmit();
    }
  };

  return (
    <TaskSection title="Task Actions">
      <Container>
        <Box pb={4}>
          <ActionSection
            text={
              <>
                <strong>Pending Financial Approval</strong>
                <br />
                You can cancel the request; a cancellation note is required
                before you submit.
              </>
            }
          >
            {selfCreatedTask && showCancelButton && (
              <TaskCancelButton
                isCancelled={checkStatus([CANCELLED])}
                handleClick={() => {
                  btnClick(CANCELLED);
                }}
              />
            )}
          </ActionSection>

          {checkStatus([CANCELLED]) && (
            <ActionSection>
              <NotesTextField
                id="cancellation-notes"
                placeholder="Cancellation Reason (required)"
                error={isCancelledError}
                value={cancelledNotes}
                onValueChange={setCancelledNotes}
              />
            </ActionSection>
          )}
          {checkStatus([CANCELLED]) && (
            <SubmitApprovalButton handleSubmit={handleCancel} />
          )}
        </Box>
      </Container>
      <Divider />
    </TaskSection>
  );
};

export default connect(
  (state) => ({
    selectedTaskData: state.onboardingDashboard.get("selectedTaskData"),
  }),
  {}
)(memo(SelectedRequisitionActionsSection));
