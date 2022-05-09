import React, { memo } from "react";
import NonLpEmailInputContainer from "./NonLpEmailInputContainer";
import FullNameInputContainer from "./FullNameInputContainer";
import JobTitleInputContainer from "./JobTitleInputContainer";
import JobCodeContainer from "./JobCodeContainer";
import CompanyNameSelectContainer from "./CompanyNameSelectContainer";
import OfficeNumberInputContainer from "./OfficeNumberInputContainer";
import MobileNumberInputContainer from "./MobileNumberInputContainer";
import UsernameCreateContainer from "./UsernameCreateContainer";

const CandidateDetails = () => {
  return (
    <>
      <FullNameInputContainer/>
      <UsernameCreateContainer/>
      <NonLpEmailInputContainer/>
      <JobCodeContainer/>
      <JobTitleInputContainer/>
      <CompanyNameSelectContainer/>
      <OfficeNumberInputContainer/>
      <MobileNumberInputContainer/>
    </>
  );
};

export default memo(CandidateDetails);
