import React, { memo, useContext } from "react";
import Button from "@material-ui/core/Button";
import { RequisitionRequestContext } from "./RequisitionRequestContextProvider";

const StepperResetBtn = ({ handleReset }) => {
  const {
    setRequisitionType,
    setPlannedStartDate,
    setSelectedManager,
    setSelectedBusinessUnit,
    setSelectedDepartment,
    setSelectedLocation,
    setIsBackfillChecked,
    setSelectedBackfill,
    setIsCostCenterDisabled,
    setCostCenterData,
    setManagerCostCenter,
    setSelectedCompanyCode,
    setSelectedParentMgmtCostCenter,
    setSelectedMgmtCostCenter,
    setSelectedFunctionalAreaDesc,
    setSelectedCountryDesc,
    setJobCode,
    setJobTitle,
    setSelectedReqSpendCurrency,
    setReqSpendAmount,
    setSelectedReqBonusType,
    setReqCommissionAmount,
    setSelectedReqCommissionCurrency,
    setContractMonths,
    setContractHours,
    setComments,
    setSelectedReqSpendPeriod,
    setReqBonusAmount,
    setIsCodeChanged,
  } = useContext(RequisitionRequestContext);

  const userReset = () => {
    setRequisitionType();
    setPlannedStartDate();
    setSelectedManager();
    setSelectedBusinessUnit();
    setSelectedDepartment();
    setSelectedLocation();
    setIsBackfillChecked(false);
    setSelectedBackfill(null);
    setIsCostCenterDisabled(true);
    setCostCenterData();
    setManagerCostCenter();
    setSelectedCompanyCode();
    setSelectedParentMgmtCostCenter();
    setSelectedMgmtCostCenter();
    setSelectedFunctionalAreaDesc();
    setSelectedCountryDesc();
    setJobCode("");
    setJobTitle("");
    setSelectedReqSpendCurrency();
    setReqSpendAmount();
    setSelectedReqBonusType("%");
    setReqCommissionAmount();
    setSelectedReqCommissionCurrency();
    setContractMonths();
    setContractHours();
    setComments();
    setSelectedReqSpendPeriod("");
    setReqBonusAmount();
    setIsCodeChanged(false);
    handleReset();
  };

  return (
    <Button variant="contained" color="secondary" onClick={userReset}>
      Create Another Request
    </Button>
  );
};

export default memo(StepperResetBtn);
