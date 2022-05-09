import React, {memo, useContext, useEffect, useState} from "react";
import TaskSection from "./components/TaskSection";
import {Box, Container, Divider, Typography} from "@material-ui/core";
import TaskStatuses from "../../../data/constants/TaskStatuses";
import {useHistory} from "react-router-dom";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_TASK} from "../../../operations/queries/getTask";
import handleError from "../../../data/handleError";
import {ADD_TASK_APPROVAL} from "../../../operations/mutations/addTaskApproval";
import {CREATE_LOG_ENTRY} from "../../../operations/mutations/createLogEntry";
import TaskTypes from "../../../data/constants/TaskTypes";
import ApprovalStatuses from "../../../data/constants/ApprovalStatuses";
import {connect} from "react-redux";
import {
  CancelButton,
  SubmitApprovalButton,
  TaskApproveButton,
  TaskRejectButton,
} from "./components/TaskButtons";
import {NotesTextField} from "../../../components/inputs/NotesTextField";
import MissedInputModal from "../../../components/modals/MissedInputModal";
import ActionSection from "./components/ActionSection";
import {
  getOnboardingFieldValue,
  getOnboardingFullName,
  logOptions,
} from "../../../data/helper/helpers";

const SelectedOnboardActionSection = ({
  onSubmitted,
  selectedTaskData,
  handleClose,
}) => {
  const history = useHistory();
  const {
    authUser,
    permOnboardingApproveTasks,
    permOnboardingCancelTasks,
    permOnboardingRejectTasks,
  } = useContext(AuthUserContext);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isRejectedError, setIsRejectedError] = useState(false);
  const [rejectedNotes, setRejectedNotes] = useState("");
  const [cancelledNotes, setCancelledNotes] = useState("");
  const [isCancelledError, setIsCancelledError] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const [executeTaskSearch] = useLazyQuery(GET_TASK, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const taskStatus = data.get_task?.taskStatus;
      if (
        taskStatus === TaskStatuses.READY ||
        taskStatus === TaskStatuses.PENDING_USER_TASKS
      ) {
        handleCancel();
      } else if (taskStatus === TaskStatuses.RUNNING) {
        setModalMsg("Task is currently in progress. It cannot be canceled.");
      } else {
        setModalMsg("Cancel Error: Please refresh and try again.");
      }
    },
    onError: (error) => handleError(error)(history),
  });

  const [addTaskApproval] = useMutation(ADD_TASK_APPROVAL, {
    onError: (error) => handleError(error)(history),
  });

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const createLog = (description) => {
    createLogEntry(logOptions(description));
  };

  const createLogDescription = (operation, info) => {
    return (
      `Task ${operation} >> Task ID: ${selectedTaskData.id} ` +
      `[${getOnboardingFullName(selectedTaskData)} (${getOnboardingFieldValue(
        selectedTaskData,
        "Username"
      )})]; ` +
      `${info}`
    );
  };

  const addApproval = (status, approvalStatus, approvalInfo) => {
    addTaskApproval({
      variables: {
        id: parseInt(selectedTaskData.id),
        taskType: TaskTypes.ONBOARDING,
        taskStatus: status,
        taskApprovalStatus: approvalStatus,
        input: approvalInfo,
      },
    });
  };

  const handleCloseAfterSubmit = () => {
    handleClose();
    onSubmitted();
  };

  const handleSubmit = () => {
    if (isRejected && rejectedNotes?.length === 0) {
      setIsRejectedError(true);
    } else if (isRejected && rejectedNotes?.length > 0) {
      setIsRejectedError(false);
      const approvalStatus = ApprovalStatuses.REJECTED;
      const approvalInfo = {
        approvalStage: 0,
        approvalStatus,
        approvalNote: rejectedNotes,
      };
      addApproval(TaskStatuses.CANCELLED, approvalStatus, approvalInfo);
      createLog(
        createLogDescription(
          "Rejected",
          `rejectedBy: ${authUser.profile.userName}; rejectMsg: ${rejectedNotes}`
        )
      );
      handleCloseAfterSubmit();
    }
    if (isApproved) {
      const approvalStatus = ApprovalStatuses.APPROVED;
      const approvalInfo = {
        approvalStage: 1,
        approvalStatus,
      };
        addApproval(
          selectedTaskData?.onboardingTask?.onboardEmployeeType === "Full Time"
            ? TaskStatuses.READY: TaskStatuses.PENDING_USER_TASKS,
          approvalStatus,
          approvalInfo
        );
      createLog(
        createLogDescription(
          "Approved",
          `approvedBy: ${authUser.profile.userName};`
        )
      );
      handleCloseAfterSubmit();
    }
  };

  const handleCancel = () => {
    const approvalStatus = ApprovalStatuses.CANCELLED;
    const approvalInfo = {
      approvalStage: 0,
      approvalNote: cancelledNotes,
      approvalStatus,
    };
    addApproval(TaskStatuses.CANCELLED, approvalStatus, approvalInfo);
    createLog(
      createLogDescription(
        "Cancelled",
        `cancelledBy: ${authUser.profile.userName}; cancelledMsg: ${cancelledNotes}`
      )
    );
    handleCloseAfterSubmit();
  };

  const handleCancelCheck = () => {
    if (cancelledNotes?.trim().length === 0) {
      setIsCancelledError(true);
    } else {
      setIsCancelledError(false);
      //---check task status
      executeTaskSearch({variables: {search: selectedTaskData?.id}});
    }
  };

  const approveBtnOnClick = () => {
    setIsApproved(true);
    setIsRejected(false);
  };

  const rejectBtnOnClick = () => {
    setIsApproved(false);
    setIsRejected(true);
  };

  const handleModalClose = () => {
    setModalMsg("");
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
        {selectedTaskData?.taskStatus === TaskStatuses.PENDING && (
          <div>
            <Box m={2}>
              <Box mt={1} mb={2}>
                <Typography component={"div"} variant="subtitle1">
                  <strong>Pending Approval</strong>
                  <br />
                  If you approve and submit, the onboarding will proceed. If you
                  reject, a rejection note is required before you submit.
                </Typography>
              </Box>
              {permOnboardingApproveTasks && (
                <TaskApproveButton
                  isApproved={isApproved}
                  handleClick={approveBtnOnClick}
                />
              )}{" "}
              {permOnboardingRejectTasks && (
                <TaskRejectButton
                  isRejected={isRejected}
                  handleClick={rejectBtnOnClick}
                />
              )}
            </Box>
            {isRejected && (
              <Box m={2}>
                <NotesTextField
                  id="rejection-notes"
                  placeholder="Rejection Reason (required)"
                  error={isRejectedError}
                  value={rejectedNotes}
                  onValueChange={setRejectedNotes}
                />
              </Box>
            )}
            {(isApproved || isRejected) && (
              <SubmitApprovalButton handleSubmit={handleSubmit} />
            )}
          </div>
        )}

        {permOnboardingCancelTasks &&
          (selectedTaskData?.taskStatus === TaskStatuses.READY ||
            selectedTaskData?.taskStatus ===
              TaskStatuses.PENDING_USER_TASKS) && (
            <ActionSection
              text={
                <>
                  Onboarding task is scheduled to run. <br />
                  You can cancel the task; a cancellation note is required
                  before you submit.
                </>
              }
            >
              <NotesTextField
                id="cancellation-notes"
                placeholder="Cancellation Reason (required)"
                error={isCancelledError}
                value={cancelledNotes}
                onValueChange={setCancelledNotes}
              />
              <CancelButton handleClick={handleCancelCheck} />
            </ActionSection>
          )}
      </Container>
      {modalMsg && (
        <MissedInputModal
          open={!!modalMsg}
          handleClose={handleModalClose}
          modalMsg={modalMsg}
        />
      )}

      <Divider />
    </TaskSection>
  );
};

export default connect(
  (state) => ({selectedTaskData: state.taskManager.get("selectedTaskData")}),
  {}
)(memo(SelectedOnboardActionSection));
