import React, {memo, useCallback, useContext, useState} from "react";
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
import {NotesTextField} from "../../../components/inputs/NotesTextField";
import MissedInputModal from "../../../components/modals/MissedInputModal";
import {getOnboardingFieldValue, getOnboardingFullName, logOptions} from "../../../data/helper/helpers";
import {CancelButton} from "../../TaskManagerPage/SelectedTasks/components/TaskButtons";
import TaskSection from "../../TaskManagerPage/SelectedTasks/components/TaskSection";

const SelectedOnboardActionSection = ({
  onSubmitted,
  selectedTaskData,
  handleClose,
}) => {
  const history = useHistory();
  const {authUser} = useContext(AuthUserContext);
  const [cancelledNotes, setCancelledNotes] = useState("");
  const [isCancelledError, setIsCancelledError] = useState(false);
  const [modalMsg, setModalMsg] = useState("");


  const [executeTaskSearch] = useLazyQuery(GET_TASK, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const taskStatus = data.get_task?.taskStatus;
      if (
        taskStatus === TaskStatuses.READY ||
        taskStatus === TaskStatuses.PENDING_USER_TASKS ||
        taskStatus === TaskStatuses.PENDING
      ) {
        handleCancel();
      } else if (taskStatus === TaskStatuses.RUNNING) {
        handleOpen("Task is currently in progress. It cannot be canceled.");
      } else {
        handleOpen("Cancel Error");
      }
    },
    onError: (error) => handleError(error)(history),
  });

  const [addTaskApproval] = useMutation(ADD_TASK_APPROVAL, {
    onError: (error) => handleError(error)(history),
  });

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const createLog = (description) => {
    createLogEntry(logOptions(description, "Onboarding Dashboard"));
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

  const handleCloseAfterSubmit = useCallback(() => {
    handleClose();
    setIsCancelledError(false); //
    setCancelledNotes(""); //
    onSubmitted(); // is needed ?
  }, []);


  const handleCancel = () => {
    const taskStatus = TaskStatuses.CANCELLED;
    const approvalStatus = ApprovalStatuses.CANCELLED;
    const approvalInfo = {
      approvalStage: 0,
      approvalNote: cancelledNotes,
      approvalStatus,
    };
    addApproval(taskStatus, approvalStatus, approvalInfo);
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

  const handleOpen = useCallback((msg) => {
    setModalMsg(msg);
  }, [setModalMsg]);

  const handleModalClose = useCallback(() => {
    setModalMsg("");
  }, [setModalMsg]);

  return (
    <TaskSection title="Task Actions">
      <Container>
        <Box m={2} pb={4}>
          <Box mt={1} mb={2}>
            <Typography component={"div"} variant="subtitle1">
              <strong>
                Candidate task is{" "}
                {selectedTaskData?.taskStatus ===
                TaskStatuses.PENDING && "pending approval."}
                {(selectedTaskData?.taskStatus ===
                  TaskStatuses.READY ||
                  selectedTaskData?.taskStatus ===
                  TaskStatuses.PENDING_USER_TASKS) &&
                "scheduled to run."}
            </strong>
              <br />
              You can cancel the task; a cancellation note is
              required before you submit.
            </Typography>
          </Box>

          <NotesTextField
            id="cancellation-notes"
            placeholder="Cancellation Reason (required)"
            error={isCancelledError}
            value={cancelledNotes}
            onValueChange={setCancelledNotes}
          />
          <CancelButton handleClick={handleCancelCheck} />
        </Box>
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
  (state) => ({selectedTaskData: state.onboardingDashboard.get("selectedTaskData")}),
  {}
)(memo(SelectedOnboardActionSection));
