import React from "react";
import JobCodeSelect from "./JobCodeSelect";
import RequisitionSpend from "./RequisitionSpend";
import RequisitionBonus from "./RequisitionBonus";
import RequisitionCommission from "./RequisitionCommission";
import ContractInformation from "./ContractInformation";
import JobTitle from "./JobTitle";

const JobFinanceDetails = () => {
  return (
    <>
      <JobCodeSelect />
      <JobTitle />
      <RequisitionSpend />
      <RequisitionBonus />
      <RequisitionCommission />
      <ContractInformation />
    </>
  );
};

export default JobFinanceDetails;
