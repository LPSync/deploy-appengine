import React, { createContext, useState } from "react";

export const RequisitionRequestContext = createContext();

const RequisitionRequestContextProvider = ({ children }) => {
  const [requisitionType, setRequisitionType] = useState(null);
  const [requisitionTypeError, setRequisitionTypeError] = useState(false);
  const [plannedStartDate, setPlannedStartDate] = useState("");
  const [plannedStartDateError, setPlannedStartDateError] = useState(false);
  const [selectedManager, setSelectedManager] = useState();
  const [selectedManagerError, setSelectedManagerError] = useState(false);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState(null);
  const [selectedBusinessUnitError, setSelectedBusinessUnitError] =
    useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDepartmentError, setSelectedDepartmentError] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isBackfillChecked, setIsBackfillChecked] = useState(false);
  const [selectedBackfill, setSelectedBackfill] = useState(null);
  const [selectedBackfillError, setSelectedBackfillError] = useState();
  const [isCostCenterDisabled, setIsCostCenterDisabled] = useState(true);
  const [costCenterData, setCostCenterData] = useState();
  const [managerCostCenter, setManagerCostCenter] = useState();
  const [selectedCompanyCode, setSelectedCompanyCode] = useState();
  const [selectedCompanyCodeError, setSelectedCompanyCodeError] =
    useState(false);
  const [selectedParentMgmtCostCenter, setSelectedParentMgmtCostCenter] =
    useState();
  const [
    selectedParentMgmtCostCenterError,
    setSelectedParentMgmtCostCenterError,
  ] = useState(false);
  const [selectedMgmtCostCenter, setSelectedMgmtCostCenter] = useState();
  const [selectedMgmtCostCenterError, setSelectedMgmtCostCenterError] =
    useState(false);
  const [selectedFunctionalAreaDesc, setSelectedFunctionalAreaDesc] =
    useState();
  const [selectedFunctionalAreaDescError, setSelectedFunctionalAreaDescError] =
    useState(false);
  const [selectedCountryDesc, setSelectedCountryDesc] = useState();
  const [selectedCountryDescError, setSelectedCountryDescError] =
    useState(false);
  const [jobCode, setJobCode] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobCodeError, setJobCodeError] = useState(false);
  const [jobTitleError, setJobTitleError] = useState(false);
  const [selectedReqSpendCurrency, setSelectedReqSpendCurrency] =
    useState(null);
  const [selectedReqSpendCurrencyError, setSelectedReqSpendCurrencyError] =
    useState(false);
  const [reqSpendAmount, setReqSpendAmount] = useState("");
  const [reqSpendAmountError, setReqSpendAmountError] = useState(false);
  const [selectedReqSpendPeriod, setSelectedReqSpendPeriod] = useState("");
  const [selectedReqSpendPeriodError, setSelectedReqSpendPeriodError] =
    useState(false);
  const [reqBonusAmount, setReqBonusAmount] = useState("");
  const [reqBonusAmountError, setReqBonusAmountError] = useState(false);
  const [selectedReqBonusType, setSelectedReqBonusType] = useState("%");
  const [reqBonusTypeCurrencyError, setReqBonusTypeCurrencyError] =
    useState(false);
  const [reqCommissionAmount, setReqCommissionAmount] = useState("");
  const [reqCommissionAmountError, setReqCommissionAmountError] =
    useState(false);
  const [selectedReqCommissionCurrency, setSelectedReqCommissionCurrency] =
    useState(null);
  const [
    selectedReqCommissionCurrencyError,
    setSelectedReqCommissionCurrencyError,
  ] = useState(false);
  const [contractMonths, setContractMonths] = useState("");
  const [contractMonthsError, setContractMonthsError] = useState(false);
  const [contractHours, setContractHours] = useState("");
  const [contractHoursError, setContractHoursError] = useState(false);
  const [comments, setComments] = useState();
  const [commentsError, setCommentsError] = useState(false);
  const [isCodeChanged, setIsCodeChanged] = useState(false);

  return (
    <RequisitionRequestContext.Provider
      value={{
        requisitionType,
        setRequisitionType,
        requisitionTypeError,
        setRequisitionTypeError,
        plannedStartDate,
        setPlannedStartDate,
        plannedStartDateError,
        setPlannedStartDateError,
        selectedManager,
        setSelectedManager,
        selectedManagerError,
        setSelectedManagerError,
        selectedBusinessUnit,
        setSelectedBusinessUnit,
        selectedBusinessUnitError,
        setSelectedBusinessUnitError,
        selectedDepartment,
        setSelectedDepartment,
        selectedDepartmentError,
        setSelectedDepartmentError,
        location,
        setLocation,
        locationError,
        setLocationError,
        selectedLocation,
        setSelectedLocation,
        isBackfillChecked,
        setIsBackfillChecked,
        selectedBackfill,
        setSelectedBackfill,
        selectedBackfillError,
        setSelectedBackfillError,
        isCostCenterDisabled,
        setIsCostCenterDisabled,
        costCenterData,
        setCostCenterData,
        managerCostCenter,
        setManagerCostCenter,
        selectedCompanyCode,
        setSelectedCompanyCode,
        selectedCompanyCodeError,
        setSelectedCompanyCodeError,
        selectedParentMgmtCostCenter,
        setSelectedParentMgmtCostCenter,
        selectedParentMgmtCostCenterError,
        setSelectedParentMgmtCostCenterError,
        selectedMgmtCostCenter,
        setSelectedMgmtCostCenter,
        selectedMgmtCostCenterError,
        setSelectedMgmtCostCenterError,
        selectedFunctionalAreaDesc,
        setSelectedFunctionalAreaDesc,
        selectedFunctionalAreaDescError,
        setSelectedFunctionalAreaDescError,
        selectedCountryDesc,
        setSelectedCountryDesc,
        selectedCountryDescError,
        setSelectedCountryDescError,
        jobCode,
        setJobCode,
        jobCodeError,
        setJobCodeError,
        jobTitle,
        setJobTitle,
        jobTitleError,
        setJobTitleError,
        selectedReqSpendCurrency,
        setSelectedReqSpendCurrency,
        selectedReqSpendCurrencyError,
        setSelectedReqSpendCurrencyError,
        reqSpendAmount,
        setReqSpendAmount,
        reqSpendAmountError,
        setReqSpendAmountError,
        selectedReqSpendPeriod,
        setSelectedReqSpendPeriod,
        selectedReqSpendPeriodError,
        setSelectedReqSpendPeriodError,
        reqBonusAmount,
        setReqBonusAmount,
        reqBonusAmountError,
        setReqBonusAmountError,
        selectedReqBonusType,
        setSelectedReqBonusType,
        reqBonusTypeCurrencyError,
        setReqBonusTypeCurrencyError,
        reqCommissionAmount,
        setReqCommissionAmount,
        reqCommissionAmountError,
        setReqCommissionAmountError,
        selectedReqCommissionCurrency,
        setSelectedReqCommissionCurrency,
        selectedReqCommissionCurrencyError,
        setSelectedReqCommissionCurrencyError,
        contractMonths,
        setContractMonths,
        contractMonthsError,
        setContractMonthsError,
        contractHours,
        setContractHours,
        contractHoursError,
        setContractHoursError,
        comments,
        setComments,
        commentsError,
        setCommentsError,
        isCodeChanged,
        setIsCodeChanged,
      }}
    >
      {children}
    </RequisitionRequestContext.Provider>
  );
};

export default RequisitionRequestContextProvider;
