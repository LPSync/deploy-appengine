import React, {memo, useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {Button} from "@material-ui/core";
import {CREATE_LOG_ENTRY} from "../../operations/mutations/createLogEntry";
import MissedInputModal from "../../components/modals/MissedInputModal";
import {connect} from "react-redux";
import {CREATE_ONBOARDING_TASK} from "../../operations/mutations/createOnboardingTask";
import {
  setRequisitionTypeError,
  setBusinessUnitError,
  setDepartmentError,
  setEmployeeTypeError,
  setFirstNameError,
  setHiringManagerError,
  setJobError,
  setLastNameError,
  setLocationError,
  setNonLpEmailError,
  setSelectedCompanyError,
  setSelectedDeviceError,
  setStartDateError,
  setUsernameError,
} from "../../data/redux/candidateRequest/candidateRequestActions";
import TaskScheduleTypes from "../../data/constants/TaskScheduleTypes";
import TaskTypes from "../../data/constants/TaskTypes";
import TaskStatuses from "../../data/constants/TaskStatuses";
import {AuthUserContext} from "../../AuthUserContextProvider";
import {ADD_TASK_APPROVAL} from "../../operations/mutations/addTaskApproval";
import handleError from "../../data/handleError";
import {useHistory} from "react-router-dom";
import {
  isEmpty,
  isMoreThan25Char,
  validateEmailInput,
  validateNameInput,
  validatePhoneNumberInput,
} from "../../data/helper/validation";
import {getValidationMessage} from "../../data/helper/helpers";
import ApprovalStatuses from "../../data/constants/ApprovalStatuses";

const mapStateToProps = (state) => ({
  requisitionDetails: state.candidateRequest.get("requisitionDetails").toJS(),
  candidateDetails: state.candidateRequest.get("candidateDetails").toJS(),
  additionalInformation: state.candidateRequest
    .get("additionalInformation")
    .toJS(),
});

const mapDispatchToProps = {
  setRequisitionTypeError,
  setBusinessUnitError,
  setDepartmentError,
  setEmployeeTypeError,
  setFirstNameError,
  setHiringManagerError,
  setJobError,
  setLastNameError,
  setLocationError,
  setNonLpEmailError,
  setSelectedCompanyError,
  setSelectedDeviceError,
  setStartDateError,
  setUsernameError,
};

const StepperButtons = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
  requisitionDetails,
  candidateDetails,
  additionalInformation,
  ...props
}) => {
  const {permOnboardingApprovalBypass, permOnboardingRequisitionBypass} =
    useContext(AuthUserContext);
  const history = useHistory();
  const {
    requisitionType,
    startDate,
    hiringManager,
    businessUnit,
    department,
    location,
    employeeType,
  } = requisitionDetails || {};
  const {
    firstName,
    lastName,
    username,
    nonLpEmail,
    job,
    selectedCompany,
    officeNumber,
    mobileNumber,
  } = candidateDetails || {};
  const {selectedDevice, isDeviceNoteConfirmed, isGoogleAccountNeeded} =
    additionalInformation || {};
  const {
    setRequisitionTypeError,
    setBusinessUnitError,
    setDepartmentError,
    setEmployeeTypeError,
    setFirstNameError,
    setHiringManagerError,
    setJobError,
    setLastNameError,
    setLocationError,
    setNonLpEmailError,
    setSelectedCompanyError,
    setSelectedDeviceError,
    setStartDateError,
  } = props;
  const [open, setOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [groups, setGroups] = useState(null);
  const [isFirstApprovalBypass, setIsFirstApprovalBypass] = useState(false);

  const [createOnboardingTask] = useMutation(CREATE_ONBOARDING_TASK, {
    onCompleted(data) {
      createLog(
        "info",
        `Candidate Task Created (${data?.createOnboardingTask?.id}); Req ID: ${
          requisitionType?.id ? requisitionType?.id : "n/a"
        }; Planned Start Date: ${startDate};  Manager: ${
          hiringManager.email
        }; Business Unit: ${businessUnit}; Department: ${department}; Location: ${
          location?.locationDescription
        } (${
          location?.locationCode
        }); Onboard: ${firstName} ${lastName}; Emp Type: ${employeeType};  Job Title: ${
          job?.jobTitle
        }; Company: ${selectedCompany};  Selected Device: ${selectedDevice}`
      );
      if (permOnboardingApprovalBypass) {
        const id = parseInt(data?.createOnboardingTask?.id);
        const taskStatus = TaskStatuses.PENDING_USER_TASKS;
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

  const [addTaskApproval] = useMutation(ADD_TASK_APPROVAL);

  const addApproval = (id, status, approvalStatus, approvalInfo) => {
    addTaskApproval({
      variables: {
        id: id,
        taskType: TaskTypes.ONBOARDING,
        taskStatus: status,
        taskApprovalStatus: approvalStatus,
        input: approvalInfo,
      },
    });
  };

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY, {
    onError: (error) => console.error("Error: ", error),
  });

  const createLog = (info, description) => {
    createLogEntry({
      variables: {
        input: {
          logType: "Candidate",
          logNotification: info,
          logDescription: description,
        },
      },
    });
  };

  const createTask = (timestamp) => {
    createOnboardingTask({
      variables: {
        input: {
          taskType: TaskTypes.ONBOARDING,
          taskStatus: TaskStatuses.PENDING,
          taskScheduleEpochTime: timestamp,
          taskScheduleDateTime: `${startDate}T00:00`,
          taskScheduleType: TaskScheduleTypes.SCHEDULED,
          onboardingTask: {
            onboardManagerEmail: hiringManager?.email,
            onboardManagerFirstName: hiringManager?.firstName?.trim(),
            onboardManagerLastName: hiringManager?.lastName?.trim(),
            onboardManagerId: hiringManager?.employeeNumber,
            onboardUsername: username,
            onboardBusinessUnit: businessUnit,
            onboardDepartment: department,
            onboardLocation: location?.locationCode,
            onboardLocationDescription: location?.locationDescription,
            onboardEmployeeType: employeeType,
            onboardFirstName: firstName?.trim(),
            onboardLastName: lastName?.trim(),
            onboardNonLpEmail: nonLpEmail?.trim(),
            onboardJobCode: job?.jobCode,
            onboardJobTitle: job?.jobTitle,
            onboardCompany: selectedCompany,
            onboardOfficeNumber: officeNumber,
            onboardMobileNumber: mobileNumber,
            onboardDevice: selectedDevice,
            onboardingOktaGroups: groups,
            firstApprovalBypass: isFirstApprovalBypass,
            reqId: requisitionType?.id,
            isDeviceNoteConfirmed: isDeviceNoteConfirmed,
            isGoogleAccountNeeded: isGoogleAccountNeeded,
            onboardingFinance: {
              onboardingSalaryCurrency: null,
              onboardingSalaryAmount: null,
              onboardingSalaryPeriod: null,
              onboardingContractMonths: null,
              onboardingContractHoursPerWeek: null,
            },
          },
        },
      },
    });
  };

  const handleCheck = () => {
    const errorMessage =
      (!permOnboardingRequisitionBypass &&
        getValidationMessage(
          requisitionType,
          [isEmpty],
          "Selected Requisition",
          setRequisitionTypeError
        )) ||
      getValidationMessage(
        startDate,
        [isEmpty],
        "Start Date",
        setStartDateError
      ) ||
      getValidationMessage(
        hiringManager,
        [isEmpty],
        "Manager",
        setHiringManagerError
      ) ||
      getValidationMessage(
        businessUnit,
        [isEmpty],
        "Business Unit",
        setBusinessUnitError
      ) ||
      getValidationMessage(
        department,
        [isEmpty],
        "Department",
        setDepartmentError
      ) ||
      getValidationMessage(location, [isEmpty], "Location", setLocationError) ||
      getValidationMessage(
        employeeType,
        [isEmpty],
        "Employee Type",
        setEmployeeTypeError
      ) ||
      getValidationMessage(
        firstName,
        [isEmpty, validateNameInput],
        "First Name",
        setFirstNameError
      ) ||
      getValidationMessage(
        lastName,
        [isEmpty, validateNameInput],
        "Last Name",
        setLastNameError
      ) ||
      getValidationMessage(
        username,
        [isEmpty],
        "Enter first and last name again. Username",
        setUsernameError
      ) ||
      getValidationMessage(
        nonLpEmail,
        [isEmpty, validateEmailInput],
        "Personal email",
        setNonLpEmailError
      ) ||
      getValidationMessage(job?.jobCode, [isEmpty], "Job Code", setJobError) ||
      getValidationMessage(
        job?.jobTitle,
        [isEmpty, isMoreThan25Char],
        "Job Title",
        setJobError
      ) ||
      getValidationMessage(
        selectedCompany,
        [isEmpty],
        "Company",
        setSelectedCompanyError
      ) ||
      (officeNumber &&
        getValidationMessage(
          officeNumber,
          [validatePhoneNumberInput],
          "Office number",
          setNonLpEmailError
        )) ||
      (mobileNumber &&
        getValidationMessage(
          mobileNumber,
          [validatePhoneNumberInput],
          "Mobile number",
          setNonLpEmailError
        )) ||
      getValidationMessage(
        selectedDevice,
        [isEmpty],
        "Request Device",
        setSelectedDeviceError
      );

    if (errorMessage) {
      handleOpen(errorMessage);
    } else {
      handleNext();
    }
  };

  const handleOnClick = () => {
    handleCheck();
    if (activeStep === 0) {
      if (isGoogleAccountNeeded) {
        const userGroups = [
          {
            oktaGroupId: "00gavutg8pz6etkYY2p7",
            oktaGroupName: "SSO-Google-User",
          },
          {
            oktaGroupId: "00gbg7nt92aVJc8k92p7",
            oktaGroupName: "SDP",
          },
        ];
        setGroups(userGroups);
      } else {
        const userGroups = [
          {
            oktaGroupId: "00gbswdsgp1gzNbkB2p7",
            oktaGroupName: "SSO-Google-AuthenticationOnly",
          },
          {
            oktaGroupId: "00gbg7nt92aVJc8k92p7",
            oktaGroupName: "SDP",
          },
        ];
        setGroups(userGroups);
      }
      if (permOnboardingApprovalBypass) {
        setIsFirstApprovalBypass(true);
      } else {
        setIsFirstApprovalBypass(false);
      }
    }
    if (activeStep === steps?.length - 2) {
      const scheduledTimestamp =
        new Date(`${startDate}T00:00Z`).getTime() / 1000.0;
      createTask(scheduledTimestamp);
    }
  };

  const handleOpen = (msg) => {
    setModalMsg(msg + "!");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
      <Button variant="contained" color="secondary" onClick={handleOnClick}>
        {activeStep === steps?.length - 2 ? "Confirm" : "Next"}
      </Button>

      <MissedInputModal
        open={open}
        handleClose={handleClose}
        modalMsg={modalMsg}
      />
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(StepperButtons));
