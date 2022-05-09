import React, {useState, memo, useContext} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useLazyQuery, useMutation} from "@apollo/client";
import {Box} from "@material-ui/core";
import {AuthUserContext} from "../../AuthUserContextProvider";
import {CREATE_OFFBOARDING_TASK} from "../../operations/mutations/createOffboardingTask";
import {ADD_TASK_APPROVAL} from "../../operations/mutations/addTaskApproval";
import {CREATE_LOG_ENTRY} from "../../operations/mutations/createLogEntry";
import {SEARCH_USER_OFFBOARDING_TASK} from "../../operations/queries/searchUserOffboardingTask";
import TaskStatuses, {
  getTaskStatusText,
} from "../../data/constants/TaskStatuses";
import {getValidationMessage} from "../../data/helper/helpers";
import {isEmpty, isEmptyString, isPastDate} from "../../data/helper/validation";
import ApprovalStatuses from "../../data/constants/ApprovalStatuses";
import TaskScheduleTypes from "../../data/constants/TaskScheduleTypes";
import TaskTypes from "../../data/constants/TaskTypes";
import handleError from "../../data/handleError";
import {
  setScheduleTypeError,
  setScheduleDateError,
  setScheduleEpoch,
  setScheduleTimeZoneError,
  setHrDateError,
  setHrTimeZoneError,
  setIsButtonDisabled,
  setSelectedTransferUser,
  setWarningModalMessage,
  setIsWarningModalOpen,
} from "../../data/redux/offboardRequest/offboardRequestActions";
import {GET_GOOGLE_USER_ALIASES} from "../../operations/queries/getGoogleUserAliases";
import {
  getInOffboardingRequest,
  getOffboardingRequestObject,
} from "./OffboardRequestPageContent";
import StepperBackButton from "../../components/buttons/StepperBackButton";
import StepperNextButton from "../../components/buttons/StepperNextButton";

const dispatchFunc = (dispatch) => (func) => (value) => dispatch(func(value));

const StepperButtons = ({activeStep, steps, handleBack, handleNext}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const errorDispatch = dispatchFunc(dispatch);
  const isButtonDisabled = useSelector((state) =>
    state?.offboardRequest.get("isButtonDisabled")
  );
  const dataTransfer = useSelector(getOffboardingRequestObject("dataTransfer"));
  const deviceUnassign = useSelector(
    getOffboardingRequestObject("deviceUnassign")
  );
  const unassignLicenses = useSelector(
    getInOffboardingRequest(["licenseRemoval", "unassignLicenses"])
  );
  const selectedOffboardUser = useSelector(
    getInOffboardingRequest(["offboardDetails", "selectedOffboardUser"])
  );
  const taskScheduling = useSelector(
    getOffboardingRequestObject("taskScheduling")
  );
  const hrInformation = useSelector(
    getOffboardingRequestObject("hrInformation")
  );

  const {
    selectedTransferUser,
    isDriveChecked,
    isCalendarChecked,
    isDataStudioChecked,
  } = dataTransfer || {};
  const {jamfDevicesData, googleDevicesData} = deviceUnassign || {};
  const {
    scheduleType,
    scheduleDate,
    scheduleEpoch,
    scheduleTimeZone,
    scheduleTimeZoneId,
    isNotifyTerminationsChecked,
  } = taskScheduling || {};
  const {
    hrTerminationCode,
    hrTerminationType,
    hrSelectedDate,
    hrPayrollEpoch,
    hrTimeZone,
    hrTimeZoneId,
    hrNotes,
  } = hrInformation || {};

  const {permOffboardingApprovalBypass, permOffboardingHrInfo} =
    useContext(AuthUserContext);
  const [isUnassignDevice, setIsUnassignDevice] = useState();
  const [isUnassignLicense, setIsUnassignLicense] = useState();
  const [jamfDevices, setJamfDevices] = useState([]);
  const [googleDevices, setGoogleDevices] = useState([]);
  const [licenses, setLicenses] = useState();
  const [taskOffboardingType, setTaskOffboardingType] = useState();
  const [isTransferAlias, setIsTransferAlias] = useState(true);
  const [allUserAliases, setAllUserAliases] = useState([]);

  const [executeSearchOffboardingTask] = useLazyQuery(
    SEARCH_USER_OFFBOARDING_TASK,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        checkOffboardTask(data.search_user_offboarding_task);
      },
      onError: (error) => handleError(error)(history),
    }
  );

  const [executeGetAliases] = useLazyQuery(GET_GOOGLE_USER_ALIASES, {
    variables: {search: selectedOffboardUser?.profile?.email},
    onCompleted: (data) => {
      if (data?.get_google_user_aliases?.length) {
        data?.get_google_user_aliases?.map((alias) => {
          if (alias?.alias !== "none") {
            setAllUserAliases([...allUserAliases, alias?.alias]);
          }
        });
      }
    },

    onError: (error) => handleError(error)(history),
  });

  const [createOffboardingTask] = useMutation(CREATE_OFFBOARDING_TASK, {
    onCompleted(data) {
      createLog(
        "info",
        `Offboard Task Created (${data.createOffboardingTask.id}); Offboard: ${selectedOffboardUser.profile.userName}; Transfer: ${selectedTransferUser.profile.userName};  type: ${scheduleType}; scheduledDetails: ${scheduleDate} ${scheduleTimeZoneId}; notification: ${isNotifyTerminationsChecked}; transferDrive: ${isDriveChecked}; transferCal: ${isCalendarChecked}; transferDataStudio: ${isDataStudioChecked}; removeLicense: ${isUnassignLicense}; deviceUnassign: ${isUnassignDevice} `
      );
      if (permOffboardingApprovalBypass) {
        const id = parseInt(data.createOffboardingTask.id);
        const taskStatus = TaskStatuses.READY;
        const approvalStatus = ApprovalStatuses.APPROVED;
        const approvalInfo = {
          approvalStage: 1,
          approvalStatus,
        };

        addApproval(id, taskStatus, approvalStatus, approvalInfo);
      }
    },
    onError: (error) => {
      handleOpen(
        "Error. Please refresh and try again. If the problem persists, please leave a feedback of the error."
      );

      handleError(error)(history);
    },
  });

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const [addTaskApproval] = useMutation(ADD_TASK_APPROVAL);

  const addApproval = (id, status, approvalStatus, approvalInfo) => {
    addTaskApproval({
      variables: {
        id: id,
        taskType: TaskTypes.OFFBOARDING,
        taskStatus: status,
        taskApprovalStatus: approvalStatus,
        input: approvalInfo,
      },
    });
  };

  const createLog = (info, description) => {
    createLogEntry({
      variables: {
        input: {
          logType: "Offboarding",
          logNotification: info,
          logDescription: description,
        },
      },
    });
  };

  const createTask = async (allDevices) => {
    await createOffboardingTask({
      variables: {
        input: {
          taskType: TaskTypes.OFFBOARDING,
          taskStatus: TaskStatuses.PENDING,
          taskScheduleType: taskOffboardingType,
          taskScheduleDateTime: scheduleDate,
          taskScheduleTimezone: scheduleTimeZoneId,
          taskScheduleEpochTime: scheduleEpoch,
          taskSendNotification: isNotifyTerminationsChecked,
          offboardingTask: {
            offboardUsername: selectedOffboardUser?.profile?.userName,
            offboardEmail: selectedOffboardUser?.profile?.email,
            offboardFirstName: selectedOffboardUser?.profile?.firstName,
            offboardLastName: selectedOffboardUser?.profile?.lastName,
            offboardEmployeeType: selectedOffboardUser?.profile?.employeeType,
            offboardEmployeeNumber:
              selectedOffboardUser?.profile?.employeeNumber,
            offboardLocation: selectedOffboardUser?.profile?.location,
            offboardDepartment: selectedOffboardUser?.profile?.department,
            offboardOktaId: selectedOffboardUser?.id,
            transferUsername: selectedTransferUser?.profile?.userName,
            transferFirstName: selectedTransferUser?.profile?.firstName,
            transferLastName: selectedTransferUser?.profile?.lastName,
            transferEmail: selectedTransferUser?.profile?.email,
            transferGdrive: isDriveChecked,
            transferGcalendar: isCalendarChecked,
            transferGdataStudio: isDataStudioChecked,
            transferAlias: isTransferAlias,
            offboardingTransferAlias: allUserAliases,
            unassignLicense: isUnassignLicense,
            offboardingUnassignLicenses: licenses,
            unassignDevice: isUnassignDevice,
            offboardingUnassignDevices: allDevices,
            hrTerminationCode: hrTerminationCode,
            hrTerminationType: hrTerminationType,
            payrollEndDateTime: hrSelectedDate,
            payrollEpochTime: hrPayrollEpoch,
            payrollEndTimezone: hrTimeZoneId,
            payrollNote: hrNotes,
            approvalBypass: permOffboardingApprovalBypass,
          },
        },
      },
    });
    handleNext();
  };

  const checkOffboardTask = (data) => {
    if (data.length > 0) {
      const msg = `${selectedOffboardUser?.profile?.firstName} ${
        selectedOffboardUser?.profile?.lastName
      } has an offboarding task that is ${getTaskStatusText(
        data[0].taskStatus
      ).toLocaleLowerCase()}.`;
      handleOpen(msg);
    } else {
      concatDevices(createTask);
    }
  };

  const searchOffboardTask = () => {
    executeSearchOffboardingTask({
      variables: {search: selectedOffboardUser?.profile?.email},
    });
  };

  const handleOffboardWhenCheck = () => {
    const errorMessage =
      getValidationMessage(
        scheduleType,
        [isEmpty],
        "Schedule Type",
        errorDispatch(setScheduleTypeError)
      ) ||
      ((scheduleType === TaskScheduleTypes.SCHEDULED ||
        scheduleType === TaskScheduleTypes.SENSITIVE) &&
        (getValidationMessage(
          scheduleDate,
          [isEmpty, isPastDate],
          "Scheduled Date",
          errorDispatch(setScheduleDateError)
        ) ||
          getValidationMessage(
            scheduleTimeZoneId,
            [isEmptyString],
            "Scheduled Time Zone",
            errorDispatch(setScheduleTimeZoneError)
          )));

    if (errorMessage) {
      handleOpen(errorMessage + "!");
    } else {
      handleNext();
    }
  };

  const handleHrInfoCheck = () => {
    const errorMessage =
      (hrSelectedDate || hrTimeZoneId) &&
      (getValidationMessage(
        hrSelectedDate,
        [isEmpty, isPastDate],
        "HR Scheduled Date",
        errorDispatch(setHrDateError)
      ) ||
        getValidationMessage(
          hrTimeZoneId,
          [isEmptyString],
          "HR Scheduled Time Zone",
          errorDispatch(setHrTimeZoneError)
        ));

    if (errorMessage) {
      handleOpen(errorMessage + "!");
    } else {
      handleNext();
    }
  };

  const handleDataTransferStep = () => {
    if (!selectedTransferUser) {
      dispatch(
        setSelectedTransferUser({
          id: "00u8478pxdSDWiuuR2p7",
          profile: {
            userName: "livepersondrive",
            firstName: "Liveperson",
            lastName: "Drive",
            email: "livepersondrive@liveperson.com",
          },
        })
      );
    }

    if (isDriveChecked || isCalendarChecked || isDataStudioChecked) {
      setAllUserAliases([selectedOffboardUser?.profile?.email]);
      setIsTransferAlias(true);
      executeGetAliases();
    } else {
      setIsTransferAlias(false);
      setAllUserAliases();
    }
  };

  const handleDevicesStep = () => {
    const hasJamfDevices = jamfDevicesData?.length;
    const hasGoogleDevices = googleDevicesData?.length;

    if (hasJamfDevices) {
      setIsUnassignDevice(true);
      const userDevices = jamfDevicesData.map((device) => {
        if (device.isChecked) {
          return {
            deviceManager: "jamf",
            deviceName: device.deviceName,
            deviceId: device.id,
            deviceSerialNumber: device.serialNumber,
            deviceModel: device.model,
          };
        }
      });

      setJamfDevices(userDevices);
    }
    if (hasGoogleDevices) {
      setIsUnassignDevice(true);
      const userDevices = googleDevicesData.map((device) => {
        if (device.isChecked) {
          return {
            deviceManager: "google",
            deviceName: "Chrome OS",
            deviceId: device.deviceId,
            deviceSerialNumber: device.serialNumber,
            deviceModel: device.model,
          };
        }
      });
      setGoogleDevices(userDevices);
    }

    if (!hasJamfDevices && !hasGoogleDevices) {
      setIsUnassignDevice(false);
    }
  };

  const handleLicensesStep = () => {
    if (unassignLicenses?.length) {
      setIsUnassignLicense(true);
      const userLicenses = unassignLicenses.map((license) => license.name);
      setLicenses(userLicenses);
    } else {
      setIsUnassignLicense(false);
      setLicenses();
    }
  };

  const concatDevices = async (callback) => {
    const allDevices = jamfDevices.concat(googleDevices);

    await callback(allDevices);
  };

  const handleOnConfirm = () => {
    if (activeStep === steps?.length - 2) {
      dispatch(setIsButtonDisabled(true));

      if (scheduleType === TaskScheduleTypes.SENSITIVE) {
        setTaskOffboardingType(TaskScheduleTypes.SCHEDULED);
      } else {
        setTaskOffboardingType(scheduleType);
      }
      if (scheduleType === TaskScheduleTypes.IMMEDIATE && scheduleEpoch) {
        dispatch(setScheduleEpoch());
      }

      searchOffboardTask();
    }
  };

  const handleOnNext = async () => {
    if (activeStep === 1) {
      await handleOffboardWhenCheck();
    } else if (activeStep === 2) {
      await handleDataTransferStep();
      await handleLicensesStep();
      await handleDevicesStep();
      handleNext();
    } else if (activeStep === 3) {
      if (permOffboardingHrInfo) {
        await handleHrInfoCheck();
      }
    } else {
      handleNext();
    }
  };

  const handleOpen = (msg) => {
    dispatch(setWarningModalMessage(msg));
    dispatch(setIsWarningModalOpen(true));
  };

  return (
    <Box style={{display: "flex", justifyContent: "center"}}>
      <Box mr={1}>
        <StepperBackButton disabled={activeStep === 0} onClick={handleBack} />
      </Box>
      <StepperNextButton
        disabled={isButtonDisabled}
        activeStep={activeStep}
        steps={steps}
        onClick={
          activeStep === steps?.length - 2 ? handleOnConfirm : handleOnNext
        }
      />
    </Box>
  );
};

export default memo(StepperButtons);
