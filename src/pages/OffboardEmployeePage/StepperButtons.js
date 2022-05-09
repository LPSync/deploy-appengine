import React, {memo, useContext, useState} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {useLazyQuery, useMutation} from "@apollo/client";
import {Button} from "@material-ui/core";
import {OffboardEmployeeContext} from "./OffboardEmployeeContextProvider";
import {AuthUserContext} from "../../AuthUserContextProvider";
import {CREATE_OFFBOARDING_TASK} from "../../operations/mutations/createOffboardingTask";
import {ADD_TASK_APPROVAL} from "../../operations/mutations/addTaskApproval";
import {CREATE_LOG_ENTRY} from "../../operations/mutations/createLogEntry";
import {SEARCH_USER_OFFBOARDING_TASK} from "../../operations/queries/searchUserOffboardingTask";
import TaskStatuses, {
  getTaskStatusText,
} from "../../data/constants/TaskStatuses";
import MissedInputModal from "../../components/modals/MissedInputModal";
import {getValidationMessage} from "../../data/helper/helpers";
import {isEmpty, isEmptyString, isPastDate} from "../../data/helper/validation";
import ApprovalStatuses from "../../data/constants/ApprovalStatuses";
import TaskScheduleTypes from "../../data/constants/TaskScheduleTypes";
import TaskTypes from "../../data/constants/TaskTypes";
import handleError from "../../data/handleError";

const StepperButtons = ({
  selectedOffboardUser,
  activeStep,
  steps,
  handleNext,
  handleBack,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const {
    checkedDrive,
    checkedCalendar,
    selectedTransferUser,
    setSelectedTransferUser,
    offboardingType,
    sendTerminationsEmail,
    selectedDate,
    hrPayrollEpoch,
    hrTimeZoneId,
    hrSelectedDate,
    hrNotes,
    hrTerminationCode,
    hrTerminationType,
    jamfDevicesData,
    googleDevicesData,
    googleUserAliases,
    taskTimeZoneId,
    setSelectedDateError,
    setHrDateError,
    setHrTimeZoneError,
    setTaskTimeZoneError,
    setOffboardingTypeError,
    setAllUserAliases,
    allUserAliases,
    taskScheduleEpoch,
    setTaskScheduleEpoch,
    isBtnDisabled,
    setIsBtnDisabled,
    unassignLicenses,
  } = useContext(OffboardEmployeeContext);
  const {permOffboardingApprovalBypass} = useContext(AuthUserContext);
  const [isUnassignDevice, setIsUnassignDevice] = useState();
  const [isUnassignLicense, setIsUnassignLicense] = useState();
  const [jamfDevices, setJamfDevices] = useState([]);
  const [googleDevices, setGoogleDevices] = useState([]);
  const [licenses, setLicenses] = useState();
  const [taskOffboardingType, setTaskOffboardingType] = useState();
  const history = useHistory();

  const handleOpen = (msg) => {
    setModalMsg(msg + "!");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const [createOffboardingTask] = useMutation(CREATE_OFFBOARDING_TASK, {
    onCompleted(data) {
      createLog(
        "info",
        `Offboard Task Created (${data.createOffboardingTask.id}); Offboard: ${selectedOffboardUser.profile.userName}; Transfer: ${selectedTransferUser.profile.userName};  type: ${offboardingType}; scheduledDetails: ${selectedDate} ${taskTimeZoneId}; notification: ${sendTerminationsEmail}; transferDrive: ${checkedDrive}; transferCal: ${checkedCalendar}; transferAlias: true; removeLicense: ${isUnassignLicense}; deviceUnassign: ${isUnassignDevice} `
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
    onError: (error) => handleError(error)(history),
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
          taskScheduleDateTime: selectedDate,
          taskScheduleTimezone: taskTimeZoneId,
          taskScheduleEpochTime: taskScheduleEpoch,
          taskSendNotification: sendTerminationsEmail,
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
            transferGdrive: checkedDrive,
            transferGcalendar: checkedCalendar,
            transferAlias: true,
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

  const concatDevices = async (callback) => {
    const allDevices = jamfDevices.concat(googleDevices);

    await callback(allDevices);
  };

  const checkOffboardTask = (data) => {
    setIsBtnDisabled(true);
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

  const handleCheck = () => {
    if (!selectedTransferUser) {
      setSelectedTransferUser({
        id: "00u8478pxdSDWiuuR2p7",
        profile: {
          userName: "livepersondrive",
          firstName: "Liveperson",
          lastName: "Drive",
          email: "livepersondrive@liveperson.com",
        },
      });
    }
    const errorMessage =
      getValidationMessage(
        offboardingType,
        [isEmpty],
        "Offboarding Type",
        setOffboardingTypeError
      ) ||
      ((offboardingType === TaskScheduleTypes.SCHEDULED ||
        offboardingType === TaskScheduleTypes.SENSITIVE) &&
        (getValidationMessage(
          selectedDate,
          [isEmpty],
          "Scheduled Date",
          setSelectedDateError
        ) ||
          getValidationMessage(
            selectedDate,
            [isPastDate],
            "Scheduled Date",
            setSelectedDateError
          ) ||
          getValidationMessage(
            taskTimeZoneId,
            [isEmptyString],
            "Scheduled Time Zone",
            setTaskTimeZoneError
          ))) ||
      ((hrSelectedDate || hrTimeZoneId) &&
        (getValidationMessage(
          hrSelectedDate,
          [isEmpty, isPastDate],
          "HR Scheduled Date",
          setHrDateError
        ) ||
          getValidationMessage(
            hrTimeZoneId,
            [isEmptyString],
            "HR Scheduled Time Zone",
            setHrTimeZoneError
          )));

    if (errorMessage) {
      handleOpen(errorMessage);
    } else {
      handleNext();
    }
  };

  const handleOnConfirm = () => {
    if (activeStep === steps?.length - 2) {
      searchOffboardTask();
    }
  };

  const handleOnNext = () => {
    if (activeStep === 0) {
      handleCheck();
      if (googleUserAliases?.length > 1) {
        let aliasList = [];
        googleUserAliases.map((alias) => aliasList.push(alias.alias));
        setAllUserAliases(allUserAliases.concat(aliasList));
      }
      if (jamfDevicesData?.length > 0) {
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
      if (googleDevicesData?.length > 0) {
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
      if (jamfDevicesData?.length === 0 && googleDevicesData?.length === 0) {
        setIsUnassignDevice(false);
      }
      if (unassignLicenses?.length > 0) {
        setIsUnassignLicense(true);
        const userLicenses = unassignLicenses.map((license) => license.name);
        setLicenses(userLicenses);
      } else {
        setIsUnassignLicense(false);
        setLicenses();
      }
      if (offboardingType === TaskScheduleTypes.SENSITIVE) {
        setTaskOffboardingType(TaskScheduleTypes.SCHEDULED);
      } else {
        setTaskOffboardingType(offboardingType);
      }
      if (
        offboardingType === TaskScheduleTypes.IMMEDIATE &&
        taskScheduleEpoch
      ) {
        setTaskScheduleEpoch();
      }
    }
  };

  return (
    <>
      {selectedOffboardUser && (
        <>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button
            disabled={isBtnDisabled}
            variant="contained"
            color="secondary"
            onClick={
              activeStep === steps?.length - 2 ? handleOnConfirm : handleOnNext
            }
          >
            {activeStep === steps?.length - 2 ? "Confirm" : "Next"}
          </Button>
        </>
      )}

      <MissedInputModal
        open={open}
        handleClose={handleClose}
        modalMsg={modalMsg}
      />
    </>
  );
};

export default connect(
  (state) => ({
    selectedOffboardUser: state.offboardRequest.get("selectedOffboardUser"),
  }),
  {}
)(memo(StepperButtons));
