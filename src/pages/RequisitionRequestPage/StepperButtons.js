import React, {memo, useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {Button} from "@material-ui/core";
import {RequisitionRequestContext} from "./RequisitionRequestContextProvider";
import {CREATE_LOG_ENTRY} from "../../operations/mutations/createLogEntry";
import {CREATE_REQUISITION_TASK} from "../../operations/mutations/createRequisitionTask";
import MissedInputModal from "../../components/modals/MissedInputModal";
import {
  isEmpty, isMoreThan25Char,
  isPastDate,
  validateNumberInput,
  validateSalaryInput
} from "../../data/helper/validation";
import {getValidationMessage} from "../../data/helper/helpers";
import TaskStatuses from "../../data/constants/TaskStatuses";
import TaskScheduleTypes from "../../data/constants/TaskScheduleTypes";
import TaskTypes from "../../data/constants/TaskTypes";

const StepperButtons = (props) => {
  const {
    requisitionType,
    setRequisitionTypeError,
    plannedStartDate,
    setPlannedStartDateError,
    selectedManager,
    setSelectedManagerError,
    selectedBusinessUnit,
    setSelectedBusinessUnitError,
    selectedDepartment,
    setSelectedDepartmentError,
    location,
    setLocationError,
    isBackfillChecked,
    selectedBackfill,
    setSelectedBackfillError,
    selectedCompanyCode,
    setSelectedCompanyCodeError,
    selectedParentMgmtCostCenter,
    setSelectedParentMgmtCostCenterError,
    selectedMgmtCostCenter,
    setSelectedMgmtCostCenterError,
    selectedFunctionalAreaDesc,
    setSelectedFunctionalAreaDescError,
    selectedCountryDesc,
    setSelectedCountryDescError,
    jobCode,
    setJobCodeError,
    jobTitle,
    setJobTitleError,
    selectedReqSpendCurrency,
    setSelectedReqSpendCurrencyError,
    reqSpendAmount,
    setReqSpendAmountError,
    selectedReqSpendPeriod,
    setSelectedReqSpendPeriodError,
    reqBonusAmount,
    selectedReqBonusType,
    setReqBonusTypeCurrencyError,
    reqCommissionAmount,
    selectedReqCommissionCurrency,
    contractMonths,
    setContractMonthsError,
    contractHours,
    setContractHoursError,
    comments,
    setCommentsError,
  } = useContext(RequisitionRequestContext);
  const [open, setOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const [createRequisitionTask] = useMutation(CREATE_REQUISITION_TASK, {
    onCompleted(data) {
      createLog(
        "info",
        `Requisition Task Created (${data.createRequisitionTask.id}); Type: ${requisitionType}; Planned Start Date: ${plannedStartDate};  Manager: ${selectedManager.profile.email}; Business Unit: ${selectedBusinessUnit.businessUnit}; Department: ${selectedDepartment.department}; Location: ${location.description} (${location.locationCode}); Backfill?: ${isBackfillChecked}; Cost Center: ${selectedCompanyCode.costCenterCode}-${selectedParentMgmtCostCenter.costCenterCode}-${selectedMgmtCostCenter.costCenterCode}-${selectedFunctionalAreaDesc.costCenterCode}-${selectedCountryDesc.costCenterCode}-00; Job Code: ${jobCode};`
      );
    },
  });

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const createLog = (info, description) => {
    createLogEntry({
      variables: {
        input: {
          logType: "Requisition",
          logNotification: info,
          logDescription: description,
        },
      },
    });
  };

  const createTask = (backfill) => {
    createRequisitionTask({
      variables: {
        input: {
          taskType: TaskTypes.REQUISITION,
          taskStatus: TaskStatuses.PENDING,
          taskScheduleType: TaskScheduleTypes.IMMEDIATE,
          requisitionTask: {
            reqType: requisitionType,
            reqStartDate: `${plannedStartDate}T00:00`,
            reqHiringManagerEmail: selectedManager?.profile?.email,
            reqHiringManagerFirstName: selectedManager?.profile?.firstName,
            reqHiringManagerLastName: selectedManager?.profile?.lastName,
            reqHiringManagerId: selectedManager?.profile?.employeeNumber,
            reqBusinessUnit: selectedBusinessUnit?.businessUnit,
            reqDepartment: selectedDepartment?.department,
            reqLocation: location?.locationCode,
            reqLocationDescription: location?.description,
            isBackfill: isBackfillChecked,
            reqBackfillFirstName: backfill?.firstName,
            reqBackfillLastName: backfill?.lastName,
            reqBackfillUsername: backfill?.userName,
            reqCompanyCode: selectedCompanyCode?.costCenterCode,
            reqParentMgmtCC: selectedParentMgmtCostCenter?.costCenterCode,
            reqManagementCC: selectedMgmtCostCenter?.costCenterCode,
            reqFunctionalAreaDesc: selectedFunctionalAreaDesc?.costCenterCode,
            reqCountryDesc: selectedCountryDesc?.costCenterCode,
            reqJobCode: jobCode,
            reqJobTitle: jobTitle,
            reqSpendCurrency: selectedReqSpendCurrency?.AlphabeticCode,
            reqSpendAmount: parseFloat(reqSpendAmount),
            reqSpendPeriod: selectedReqSpendPeriod,
            reqBonusAmount: parseFloat(reqBonusAmount),
            reqBonusType: selectedReqBonusType,
            reqCommissionCurrency: selectedReqCommissionCurrency
              ? selectedReqCommissionCurrency.AlphabeticCode
              : "",
            reqCommissionAmount: parseFloat(reqCommissionAmount),
            reqContractMonths: parseInt(contractMonths),
            reqContractHoursPerWeek: parseInt(contractHours),
            comments: comments,
          },
        },
      },
    });
  };

  const handleCheck = () => {
    const errorMessage =
      getValidationMessage(
        requisitionType,
        [isEmpty],
        "Requisition Type",
        setRequisitionTypeError
      ) ||
      getValidationMessage(
        plannedStartDate,
        [isEmpty],
        "Start Date",
        setPlannedStartDateError
      ) ||
      getValidationMessage(
        plannedStartDate,
        [isPastDate],
        "Start Date",
        setPlannedStartDateError
      ) ||
      getValidationMessage(
        selectedManager,
        [isEmpty],
        "Manager",
        setSelectedManagerError
      ) ||
      getValidationMessage(
        selectedBusinessUnit,
        [isEmpty],
        "Business Unit",
        setSelectedBusinessUnitError
      ) ||
      getValidationMessage(
        selectedDepartment,
        [isEmpty],
        "Department",
        setSelectedDepartmentError
      ) ||
      getValidationMessage(location, [isEmpty], "Location", setLocationError) ||
      getValidationMessage(
        selectedCompanyCode,
        [isEmpty],
        "Company Code",
        setSelectedCompanyCodeError
      ) ||
      getValidationMessage(
        selectedParentMgmtCostCenter,
        [isEmpty],
        "Parent Management Cost Center",
        setSelectedParentMgmtCostCenterError
      ) ||
      getValidationMessage(
        selectedMgmtCostCenter,
        [isEmpty],
        "Management Cost Center",
        setSelectedMgmtCostCenterError
      ) ||
      getValidationMessage(
        selectedFunctionalAreaDesc,
        [isEmpty],
        "Functional Area Description",
        setSelectedFunctionalAreaDescError
      ) ||
      getValidationMessage(
        selectedCountryDesc,
        [isEmpty],
        "Country Description",
        setSelectedCountryDescError
      ) ||
      getValidationMessage(
        jobCode,
        [isEmpty],
        "Job Code",
        setJobCodeError
      )||
      getValidationMessage(
        jobTitle,
        [isEmpty, isMoreThan25Char],
        "Job Title",
        setJobTitleError
      ) ||
      getValidationMessage(
        selectedReqSpendCurrency,
        [isEmpty],
        "Requisition Spend Currency",
        setSelectedReqSpendCurrencyError
      ) ||
      getValidationMessage(
        reqSpendAmount,
        [isEmpty, validateSalaryInput],
        "Requisition Spend Amount",
        setReqSpendAmountError
      ) ||
      getValidationMessage(
        selectedReqSpendPeriod,
        [isEmpty],
        "Requisition Spend Period",
        setSelectedReqSpendPeriodError
      ) ||
      (reqBonusAmount &&
        getValidationMessage(
          reqBonusAmount,
          [validateSalaryInput],
          "Requisition Bonus Amount"
        )) ||
      (reqBonusAmount &&
        selectedReqBonusType !== "%" &&
        getValidationMessage(
          selectedReqBonusType,
          [isEmpty],
          "Requisition Bonus Currency",
          setReqBonusTypeCurrencyError
        )) ||
      ((selectedReqCommissionCurrency || reqCommissionAmount) &&
        getValidationMessage(
          reqCommissionAmount,
          [validateSalaryInput],
          "Requisition Commission Amount"
        )) ||
      ((selectedReqCommissionCurrency || reqCommissionAmount) &&
        getValidationMessage(
          selectedReqCommissionCurrency,
          [isEmpty],
          "Requisition Commission Currency"
        )) ||
      getValidationMessage(
        contractMonths,
        [isEmpty, validateNumberInput],
        "Contract Months",
        setContractMonthsError
      ) ||
      getValidationMessage(
        contractHours,
        [isEmpty, validateNumberInput],
        "Contract Hours",
        setContractHoursError
      ) ||
      getValidationMessage(comments, [isEmpty], "Comments", setCommentsError) ||
      (isBackfillChecked &&
        getValidationMessage(
          selectedBackfill,
          [isEmpty],
          "Backfill",
          setSelectedBackfillError
        ));

    if (errorMessage) {
      handleOpen(errorMessage);
    } else {
      props.handleNext();
    }
  };

  const handleOnClick = () => {
    handleCheck();

    if (props?.activeStep === props?.steps?.length - 2) {
      const backfill = isBackfillChecked
        ? {
            firstName: selectedBackfill.firstName,
            lastName: selectedBackfill.lastName,
            userName: selectedBackfill.userName,
          }
        : {
            firstName: "",
            lastName: "",
            userName: "",
          };

      createTask(backfill);
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
      <>
        <Button
          disabled={props?.activeStep === 0}
          onClick={() => props?.handleBack()}
        >
          Back
        </Button>
        <Button variant="contained" color="secondary" onClick={handleOnClick}>
          {props?.activeStep === props.steps?.length - 2 ? "Confirm" : "Next"}
        </Button>
      </>

      <MissedInputModal
        open={open}
        handleClose={handleClose}
        modalMsg={modalMsg}
      />
    </>
  );
};

export default memo(StepperButtons);
