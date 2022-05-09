import React, { memo, useState } from 'react'
import StepperButtons from "./StepperButtons";
import CreateRequisitionRequestForm from "./CreateRequisitionRequestForm";
import RequestWrapperPage from "../../components/requestWrapper/RequestWrapperPage";
import StepperResetBtn from "./StepperResetBtn";
import RequestSummary from "./RequestSummary";

const steps = [
  "Create Requisition Request",
  "Review & Confirm Request",
  "Request Completed",
];

const RequisitionRequestPageContent = () => {
  const [activeStep , setActiveStep] = useState(0);

  return (
    <RequestWrapperPage
      steps={steps} activeStep={activeStep} setActiveStep={setActiveStep}
      createFormComponent={<CreateRequisitionRequestForm/>}
      reviewComponent={<RequestSummary review/>}
      summaryComponent={<RequestSummary/>}
      stepperButtons={<StepperButtons/>}
      stepperResetBtn={<StepperResetBtn/>}
    />
  );
};

export default memo(RequisitionRequestPageContent);