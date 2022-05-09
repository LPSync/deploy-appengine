import { Box, Button, CircularProgress } from "@material-ui/core";
import React, { memo, useCallback, useContext, useState } from "react";
import { ADD_OFFBOARDING_HR_INFORMATION } from "../../../../operations/mutations/addOffboardingHrInformation";
import { useMutation } from "@apollo/client";
import { ADD_TASK_APPROVAL } from "../../../../operations/mutations/addTaskApproval";
import { CREATE_LOG_ENTRY } from "../../../../operations/mutations/createLogEntry";
import { getValidationMessage, logOptions } from "../../../../data/helper/helpers";
import TaskTypes from "../../../../data/constants/TaskTypes";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, isEmptyString, isPastDate } from "../../../../data/helper/validation";
import {
  clearHrInformation,
  setHrDateError,
  setHrTerminationCodeError,
  setHrTerminationTypeError,
  setHrTimeZoneError,
} from "../../../../data/redux/taskManagerHrInfo/taskManagerHrInfoActions";
import handleError from "../../../../data/handleError";
import { useHistory } from "react-router-dom";
import { setSelectedTaskData } from "../../../../data/redux/taskManager/taskManagerActions";
import ApprovalStatuses from "../../../../data/constants/ApprovalStatuses";
import { AuthUserContext } from "../../../../AuthUserContextProvider";
import MissedInputModal from "../../../../components/modals/MissedInputModal";
import { isFullTimeEmployee } from "../../../../data/constants/EmployeeTypes";

const HrButtonSubmit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authUser } = useContext(AuthUserContext);
  const hrInformation = useSelector(state => state?.taskManagerHrInfo?.get("hrInformation")?.toJS());
  const taskId = useSelector(state => state?.taskManager?.get("selectedTaskData")?.id);
  const offboardEmployeeType = useSelector(state => state?.taskManager?.get("selectedTaskData")
    ?.offboardingTask?.offboardEmployeeType);
  const [open, setOpen] = useState();
  const [modalMsg, setModalMessage] = useState();

  const [addOffboardingHrInformation, { loading }] = useMutation(ADD_OFFBOARDING_HR_INFORMATION, {
      onCompleted: (data) => {
        const approvalStatus = ApprovalStatuses.CONFIRMED_HR_INFORMATION;
        const approvalInfo = {
          approvalStage: 0,
          approvalStatus,
        };
        addApproval(approvalStatus, approvalInfo);
        createLog(
          createLogDescription(
            "confirmed HrInformation",
            `confirmedBy: ${authUser.profile.userName};`,
          ),
        );
        dispatch(setSelectedTaskData(data?.addOffboardingHrInformation));
        dispatch(clearHrInformation());
      },
      onError: (error) => handleError(error)(history),
    },
  );

  const [addTaskApproval] = useMutation(ADD_TASK_APPROVAL);

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const createLog = (description) => {
    createLogEntry(logOptions(description));
  };

  const createLogDescription = (operation, info) => {
    return (
      `Task ${operation} >> Task ID: ${taskId} ` + `${info}`
    );
  };

  const addApproval = (approvalStatus, approvalInfo) => {
    addTaskApproval({
      variables: {
        id: parseInt(taskId),
        taskType: TaskTypes.OFFBOARDING,
        // taskStatus: status,
        taskApprovalStatus: approvalStatus,
        input: approvalInfo,
      },
    });
  };

  const handleSubmit = useCallback(() => {
    const {
      hrTerminationCode,
      hrTerminationType,
      hrSelectedDate,
      hrPayrollEpoch,
      hrTimeZoneId,
      hrNotes,
    } = hrInformation || {};

    const errorMessage = getValidationMessage(
      taskId,
      [isEmpty],
      "id",
    ) || getValidationMessage(
      hrTerminationCode,
      [isEmpty],
      "HR Termination Code",
      (error) => dispatch(setHrTerminationCodeError(error)),
    ) || getValidationMessage(
      hrTerminationType,
      [isEmpty],
      "HR Termination Type",
      (error) => dispatch(setHrTerminationTypeError(error)),
    ) || (isFullTimeEmployee(offboardEmployeeType)
      && (getValidationMessage(
          hrSelectedDate,
          [isEmpty, isPastDate],
          "HR Scheduled Date",
          (error) => dispatch(setHrDateError(error)),
        ) ||
        getValidationMessage(
          hrTimeZoneId,
          [isEmptyString],
          "HR Scheduled Time Zone",
          (error) => dispatch(setHrTimeZoneError(error)),
        ) || getValidationMessage(
          hrPayrollEpoch,
          [isEmpty],
          "HR Payroll Epoch",
        )));

    if (errorMessage) {
      return handleOpen(errorMessage);
    }
    const input = {
      taskId: parseInt(taskId),
      hrTerminationCode: hrTerminationCode,
      hrTerminationType: hrTerminationType,
      payrollEndDateTime: hrSelectedDate,
      payrollEpochTime: hrPayrollEpoch,
      payrollEndTimezone: hrTimeZoneId,
      payrollNote: hrNotes,
    };

    addOffboardingHrInformation({
      variables: { input },
    });
  }, [taskId, hrInformation]);

  const handleOpen = (msg) => {
    setModalMessage(msg + "!");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box pb={2} px={5}>
      <Button color="secondary" variant="contained" size="small" onClick={handleSubmit}>
        {loading && <CircularProgress size={20} color="inherit" style={{ marginRight: 4 }} />}
        Submit
      </Button>

      <MissedInputModal
        open={open}
        handleClose={handleClose}
        modalMsg={modalMsg}
      />
    </Box>
  );
};

export default memo(HrButtonSubmit);