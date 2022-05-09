import React from "react";
import LocationSelect from "./LocationSelect";
import BusinessUnitDeptSelect from "./BusinessUnitDeptSelect";
import ManagerSelect from "./ManagerSelect";
import RequisitionTypeSelect from "./RequisitionTypeSelect";
import StartDateInput from "./StartDateInput";
import BackfillSelect from "./BackfillSelect";

const RequisitionDetails = () => {
  return (
    <>
      <RequisitionTypeSelect />
      <StartDateInput />
      <ManagerSelect />
      <BusinessUnitDeptSelect />
      <LocationSelect />
      <BackfillSelect />
    </>
  );
};

export default RequisitionDetails;
