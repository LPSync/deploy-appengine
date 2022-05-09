import React, { memo } from "react";
import RequisitionTypeSelectContainer from "./RequisitionTypeSelectContainer";
import StartDateInputContainer from "./StartDateInputContainer";
import HiringManagerSelectContainer from "./HiringManagerContainer";
import BusinessUnitDeptSelectContainer from "./BusinessUnitDeptSelectContainer";
import LocationSelectContainer from "./LocationSelectContainer";
import EmployeeTypeSelectContainer from "./EmployeeTypeSelectContainer";

const RequisitionDetails = () => {
  return (
    <>
      <RequisitionTypeSelectContainer />
      <StartDateInputContainer/>
      <HiringManagerSelectContainer/>
      <BusinessUnitDeptSelectContainer/>
      <LocationSelectContainer/>
      <EmployeeTypeSelectContainer/>
    </>
  );
};

export default memo(RequisitionDetails);
