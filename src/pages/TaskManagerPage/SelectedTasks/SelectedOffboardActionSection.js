import React, {createRef, memo, useContext, useEffect, useState} from "react";
import {Box, Container, Divider, Tooltip, Typography} from "@material-ui/core";
import TaskStatuses from "../../../data/constants/TaskStatuses";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import ApprovalStatuses from "../../../data/constants/ApprovalStatuses";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_TASK} from "../../../operations/queries/getTask";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";
import {ADD_TASK_APPROVAL} from "../../../operations/mutations/addTaskApproval";
import {CREATE_LOG_ENTRY} from "../../../operations/mutations/createLogEntry";
import TaskTypes from "../../../data/constants/TaskTypes";
import {
  getOffboardingFieldValue,
  getOffboardingFullName,
  logOptions,
} from "../../../data/helper/helpers";
import {
  CancelButton,
  SubmitApprovalButton,
  TaskApproveButton,
  TaskRejectButton,
} from "./components/TaskButtons";
import {NotesTextField} from "../../../components/inputs/NotesTextField";
import MissedInputModal from "../../../components/modals/MissedInputModal";
import ActionSection from "./components/ActionSection";
import TaskSection from "./components/TaskSection";
import {connect} from "react-redux";

const SelectedOffboardActionSection = ({
  onSubmitted,
  selectedTaskData,
  handleClose,
  approveDisabled,
}) => {
  let history = useHistory();
  const {
    authUser,
    permOffboardingApproveTasks,
    permOffboardingCancelTasks,
    permOffboardingRejectTasks,
  } = useContext(AuthUserContext);

  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isRejectedError, setIsRejectedError] = useState(false);
  const [rejectedNotes, setRejectedNotes] = useState("");
  const [isCancelledError, setIsCancelledError] = useState(false);
  const [cancelledNotes, setCancelledNotes] = useState("");
  const [modalMsg, setModalMsg] = useState("");

  const [executeSearch] = useLazyQuery(GET_TASK, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      if (data.get_task?.taskStatus === TaskStatuses.READY) {
        handleCancel();
      } else if (data.get_task?.taskStatus === TaskStatuses.RUNNING) {
        setModalMsg("Task is currently in progress. It cannot be canceled.");
      } else {
        setModalMsg("Cancel Error: Please refresh and try again.");
      }
    },
    onError: (error) => handleError(error)(history),
  });

  const [addTaskApproval] = useMutation(ADD_TASK_APPROVAL);

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const createLog = (description) => {
    createLogEntry(logOptions(description));
  };

  const createLogDescription = (operation, info) => {
    return (
      `Task ${operation} >> Task ID: ${selectedTaskData.id} ` +
      `[${getOffboardingFullName(selectedTaskData)} (${getOffboardingFieldValue(
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
        taskType: TaskTypes.OFFBOARDING,
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
    if (isRejected) {
      if (!rejectedNotes?.length) {
        setIsRejectedError(true);
      } else {
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
            `rejectedBy: ${authUser.profile.userName};`,
            `rejectMsg: ${rejectedNotes}`
          )
        );
        handleCloseAfterSubmit();
      }
    }
    if (isApproved) {
      const approvalStatus = ApprovalStatuses.APPROVED;
      const approvalInfo = {
        approvalStage: 1,
        approvalStatus,
      };
      addApproval(TaskStatuses.READY, approvalStatus, approvalInfo);
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
    if (cancelledNotes?.length === 0) {
      setIsCancelledError(true);
    } else {
      setIsCancelledError(false);

      //---check task status
      executeSearch({variables: {search: selectedTaskData?.id}});
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
  const ref = createRef();

  return (
    <TaskSection title="Task Actions">
      <Container>
        {selectedTaskData?.taskStatus === TaskStatuses.PENDING && (
          <div>
            <Box m={2}>
              <Box mt={1} mb={2}>
                <Typography component={"div"} variant="subtitle1">
                  <strong>Pending Approval</strong> <br />
                  If you approve and submit, the offboarding will proceed. If
                  you reject, a rejection note is required before you submit.
                </Typography>
              </Box>
              {permOffboardingApproveTasks && (
                <TaskApproveButton
                  ref={ref}
                  disabled={approveDisabled}
                  isApproved={isApproved}
                  handleClick={approveBtnOnClick}
                />
              )}
              {permOffboardingRejectTasks && (
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
        {permOffboardingCancelTasks &&
          selectedTaskData?.taskStatus === TaskStatuses.READY && (
            <ActionSection
              text={
                <>
                  Offboarding task is scheduled to run. <br />
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
        {modalMsg && (
          <MissedInputModal
            open={!!modalMsg}
            handleClose={handleModalClose}
            modalMsg={modalMsg}
          />
        )}
      </Container>

      <Divider />
    </TaskSection>
  );
};

export default connect(
  (state) => ({selectedTaskData: state.taskManager.get("selectedTaskData")}),
  {}
)(memo(SelectedOffboardActionSection));
