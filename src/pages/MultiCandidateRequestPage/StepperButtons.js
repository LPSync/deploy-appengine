import React, {memo, useEffect, useMemo, useState} from "react";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {Button} from "@material-ui/core";
import {CREATE_LOG_ENTRY} from "../../operations/mutations/createLogEntry";
import MissedInputModal from "../../components/modals/MissedInputModal";
import {connect} from "react-redux";

import TaskTypes from "../../data/constants/TaskTypes";
import {useHistory} from "react-router-dom";
import {
  isEmployeeType,
  isEmpty, isInArray,
  isMoreThan25Char, isPastDate,
  validateEmailInput,
  validateNameInput,
  validDateFormat,
} from "../../data/helper/validation";
import {getValidationMessage} from "../../data/helper/helpers";
import {setSelectedTasks} from "../../data/redux/multiCandidateRequest/multiCandidateRequestActions";
import TaskStatuses from "../../data/constants/TaskStatuses";
import TaskScheduleTypes from "../../data/constants/TaskScheduleTypes";
import {GET_ULTI_LOCATIONS} from "../../operations/queries/getUltiLocations";
import handleError from "../../data/handleError";
import {CREATE_MULTIPLE_ONBOARDING_TASKS} from "../../operations/mutations/createMultipleOnboardingTasks";
import {GET_REQUISITION_JOB_CODES} from "../../operations/queries/getRequisitionJobCodes";
import {GET_ULTI_BU_DEPT} from "../../operations/queries/getUltiBUDept";
import {GET_USERS_BY_EMAILS} from "../../operations/queries/getUsersByEmails";
import {GET_CONCUR_VENDORS} from "../../operations/queries/getConcurVendors";
import EmployeeTypes from "../../data/constants/EmployeeTypes";

const getGroups = (employeeType) => {
  if (employeeType === EmployeeTypes.FULL_TIME) {
    return [{oktaGroupId: "00gavutg8pz6etkYY2p7", oktaGroupName: "SSO-Google-User"}];
  }
  return [
    {oktaGroupId: "00gavutg8pz6etkYY2p7", oktaGroupName: "SSO-Google-User"},
    {oktaGroupId: "00gbg7nt92aVJc8k92p7", oktaGroupName: "SDP"}
  ];
};

const StepperButtons = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
  selectedTaskIds,
  csvData,
  selectedTasks,
  setSelectedTasks
}) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [reqJobCodes, setReqJobCodes] = useState([]);
  const [locationList, setLocationList] = useState();
  const [businessUnits, setBusinessUnits] = useState();
  const [managers, setManagers] = useState();
  const [companies, setCompanies] = useState();

  useQuery(GET_ULTI_LOCATIONS, {
    onCompleted: (data) => {
      setLocationList(data.get_ulti_locations?.map(({locationCode, locationDescription, locationCountryCode}) =>
        ({locationCode, locationDescription, locationCountryCode})
      ));
    }
  });

  useQuery(GET_REQUISITION_JOB_CODES, {
    onCompleted: (data) => {
      setReqJobCodes(data.get_requisition_job_codes);
    },
    onError: error => handleError(error)(history)
  });

  useQuery(GET_ULTI_BU_DEPT, {
    onCompleted: (data) => {
      const businessUnitSet = {};
      data.get_ulti_bu_dept?.map(b => businessUnitSet[b.businessUnit] ?
        businessUnitSet[b.businessUnit].push(b.department) :
        businessUnitSet[b.businessUnit] = [b.department]);
      setBusinessUnits(businessUnitSet);
    },
    onError: error => handleError(error)(history)
  });

  const [executeConcurCompanies] = useLazyQuery(GET_CONCUR_VENDORS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setCompanies(data.get_concur_vendors?.map(c => c.companyName));
    },
    onError: error => handleError(error)(history)
  });

  const [executeUsersByEmail] = useLazyQuery(GET_USERS_BY_EMAILS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setManagers(data.get_users_by_emails);
    },
    onError: error => handleError(error)(history)
  });

  useEffect(() => {
    if(csvData?.length) {
      const managersEmails = [...(new Set(csvData?.map(task => task?.hiringManagerEmail)))];
      const companiesNames = [...new Set(csvData?.map(task => task?.company)?.concat(["Liveperson INC."]))]
      executeUsersByEmail({variables: {search: managersEmails}});
      executeConcurCompanies({variables: {search: companiesNames}});
    }
  }, [csvData]);


  const selectedTasksData = useMemo(() =>
      selectedTaskIds?.length > 0 && csvData?.filter(data => selectedTaskIds.includes(data.id)),
    [selectedTaskIds, csvData]);

  const [createMultipleOnboardingTasks] = useMutation(CREATE_MULTIPLE_ONBOARDING_TASKS, {
    onError: (error) => handleError(error)(history),
    onCompleted(data) {
      data?.createMultipleOnboardingTasks?.forEach(task => {
        createLog(
          "info",
          `Candidate Task Created (${task?.id}); Req ID:"n/a; Planned Start Date: ${task.taskScheduleDateTime
          }; Manager: ${task.onboardingTask.onboardManagerEmail
          }; Business Unit: ${task.onboardingTask.onboardBusinessUnit}; Department: ${task.onboardingTask.onboardDepartment
          }; Location: ${task.onboardingTask.onboardLocationDescription} (${task.onboardingTask.onboardLocation
          }); Onboard: ${task.onboardingTask.onboardFirstName} ${task.onboardingTask.onboardLastName
          }; Emp Type: ${task.onboardingTask.onboardEmployeeType};  Job Title: ${task.onboardingTask.onboardJobTitle
          }; Company: ${task.onboardingTask.onboardCompany};  Selected Device: ${task.onboardingTask.onboardDevice}`
        );
      });
    }
  });

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY, {
    onError: (error) => console.error("Error: ", error)
  });

  const createLog = (info, description) => {
    createLogEntry({
      variables: {
        input: {
          logType: "Candidate",
          logNotification: info,
          logDescription: description
        }
      }
    });
  };

  const createTasks = () => {
    const input = selectedTasks?.map(task => {
      const timestamp = new Date(`${task.startDate}T00:00Z`).getTime() / 1000.0;

      const groups = getGroups(task.employeeType);

      return {
        taskType: TaskTypes.ONBOARDING,
        taskStatus: TaskStatuses.PENDING,
        taskScheduleEpochTime: timestamp,
        taskScheduleDateTime: `${task.startDate}T00:00`,
        taskScheduleType: TaskScheduleTypes.SCHEDULED,
        onboardingTask: {
          onboardManagerEmail: task.hiringManagerEmail,
          onboardManagerFirstName: task.hiringManagerFirstName.trim(),
          onboardManagerLastName: task.hiringManagerLastName.trim(),
          onboardManagerId: task.hiringManagerEmployeeNumber,
          onboardUsername: task.username,
          onboardBusinessUnit: task.businessUnit,
          onboardDepartment: task.department,
          onboardLocation: task.locationCode,
          onboardLocationDescription: task.location?.locationDescription,
          onboardEmployeeType: task.employeeType,
          onboardFirstName: task.firstName?.trim(),
          onboardLastName: task.lastName?.trim(),
          onboardNonLpEmail: task.nonLpEmail?.trim(),
          onboardJobCode: task.jobCode,
          onboardJobTitle: task.jobTitle,
          onboardCompany: task.company,
          onboardOfficeNumber: "",
          onboardMobileNumber: "",
          onboardDevice: "No",
          onboardingOktaGroups: groups,
          firstApprovalBypass: false,
          reqId: null,
          isDeviceNoteConfirmed: false,
          isGoogleAccountNeeded: true,
          onboardingFinance: {
            onboardingSalaryCurrency: null,
            onboardingSalaryAmount: null,
            onboardingSalaryPeriod: null,
            onboardingContractMonths: null,
            onboardingContractHoursPerWeek: null
          }
        }
      };
    });
    createMultipleOnboardingTasks({
      variables: {input}
    });
  };

  const handleCheck = (task) => {
    const {
      id,
      firstName,
      lastName,
      nonLpEmail,
      employeeType,
      locationCode,
      jobTitle,
      hiringManagerEmail,
      businessUnit,
      department,
      company,
      startDate
    } = task || {};

    const errorMessage =
      getValidationMessage(firstName, [isEmpty, validateNameInput], "First Name") ||
      getValidationMessage(lastName, [isEmpty, validateNameInput], "Last Name") ||
      getValidationMessage(nonLpEmail, [isEmpty, validateEmailInput], "Personal email") ||
      getValidationMessage(employeeType, [isEmpty, isEmployeeType], "Employee Type") ||
      getValidationMessage(
        locationCode,
        [isEmpty, isInArray(locationList?.map(l => l.locationCode))],
        "Location"
      ) ||
      getValidationMessage(jobTitle, [isEmpty, isMoreThan25Char], "Job Title") ||
      getValidationMessage(
        hiringManagerEmail,
        [isEmpty, validateEmailInput, isInArray(managers?.map(m => m?.profile?.email))],
        "Manager Email"
      ) ||
      getValidationMessage(
        businessUnit,
        [isEmpty, isInArray(businessUnits && Object.keys(businessUnits))],
        "Business Unit"
      ) ||
      getValidationMessage(department,
        [isEmpty, isInArray(businessUnits?.[businessUnit])],
        "Department"
      ) ||
      getValidationMessage(company,
        [company ? isInArray(companies) : () => ""],
        "Company"
      ) ||
      getValidationMessage(startDate, [isEmpty, validDateFormat, isPastDate], "Start Date");
    if (errorMessage) {
      handleOpen(errorMessage + ` in task with id: ${id}`);
    }
    return errorMessage;
  };

  const handleSecondCheck = (task) => {
    const {id, company, username, jobCode, location, hiringManagerFirstName, hiringManagerLastName, hiringManagerEmployeeNumber} = task || {};
    const errorMessage = handleCheck(task) ||
      getValidationMessage(username, [isEmpty], "Username") ||
      getValidationMessage(jobCode, [isEmpty], "Job Code") ||
      getValidationMessage(location?.locationDescription, [isEmpty], "LocationDescription") ||
      getValidationMessage(company, [isEmpty], "Company") ||
      getValidationMessage(hiringManagerFirstName, [isEmpty], "Hiring Manager First Name") ||
      getValidationMessage(hiringManagerLastName, [isEmpty], "Hiring Manager Last Name") ||
      getValidationMessage(hiringManagerEmployeeNumber, [isEmpty], "Hiring Manager Id");

    if (errorMessage) {
      handleOpen(errorMessage + ` in task with id ${id}`);
    }
    return errorMessage;
  };

  const handleOnClick = () => {
    if (!selectedTasksData?.length) {
      handleOpen("You should select at least one task");
    } else {
      if (activeStep === 0) {
        const message = selectedTasksData?.map(task => handleCheck(task));
        if (!message?.filter(m => !!m)?.length) {
          const selectedTasksFullData = selectedTasksData?.map(task => {
            const location = locationList?.find(l => l.locationCode === task.locationCode);
            const jobCodes = reqJobCodes?.find(j => j.typeName === task.employeeType);
            const jobCode = (location?.locationCountryCode === "USA") ? jobCodes?.USJobCode : jobCodes?.IntJobCode;

            const manager = managers?.find(m => m?.profile?.email === task?.hiringManagerEmail);
            const {
              firstName: hiringManagerFirstName,
              lastName: hiringManagerLastName,
              employeeNumber: hiringManagerEmployeeNumber
            } = manager?.profile || {};

            return {
              ...task,
              company: task.company || "Liveperson INC.",
              location,
              jobCode,
              hiringManagerFirstName,
              hiringManagerLastName,
              hiringManagerEmployeeNumber
            };
          });
          setSelectedTasks(selectedTasksFullData);
          handleNext();
        }
      }
      if (activeStep === steps?.length - 2) {
        const message2 = selectedTasks?.map(task => handleSecondCheck(task));
        if (!message2?.filter(m => !!m)?.length) {
          createTasks();
          handleNext();
        }
      }
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

const mapStateToProps = (state) => ({
  selectedTaskIds: state.multiCandidateRequest.get("selectedTaskIds"),
  csvData: state.multiCandidateRequest.get("csvData"),
  selectedTasks: state.multiCandidateRequest.get("selectedTasks")
});

const mapDispatchToProps = {
  setSelectedTasks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(StepperButtons));
