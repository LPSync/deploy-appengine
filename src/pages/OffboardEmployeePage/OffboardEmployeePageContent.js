import React, { memo, useState } from 'react'
import StepperButtons from "./StepperButtons";
import CreateRequestForm from "./CreateRequestForm";
import RequestWrapperPage from "../../components/requestWrapper/RequestWrapperPage";
import StepperResetBtn from "./StepperResetBtn";
import RequestSummary from "./RequestSummary";

const steps = [
  "Create Offboarding Request",
  "Review & Confirm Request",
  "Request Completed"
];

const OffboardEmployeePageContent = () => {
  const [activeStep , setActiveStep] = useState(0);

  return (
    <RequestWrapperPage
      steps={steps} activeStep={activeStep} setActiveStep={setActiveStep}
      createFormComponent={<CreateRequestForm/>}
      reviewComponent={<RequestSummary review/>}
      summaryComponent={<RequestSummary/>}
      stepperButtons={<StepperButtons/>}
      stepperResetBtn={<StepperResetBtn/>}
    />
  );
};

export default memo(OffboardEmployeePageContent);