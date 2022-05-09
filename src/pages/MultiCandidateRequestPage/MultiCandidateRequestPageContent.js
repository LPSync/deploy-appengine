import React, {memo, useEffect} from "react";
import RequestWrapperPage from "../../components/requestWrapper/RequestWrapperPage";
import CreateMultiCandidateRequestForm from "./CreateMultiCandidateRequestForm";
import MultiCandidateRequestSummary from "./MultiCandidateRequestSummary";
import StepperButtons from "./StepperButtons";
import {connect} from "react-redux";
import {
  setActiveStep,
  setDefaultState,
} from "../../data/redux/multiCandidateRequest/multiCandidateRequestActions";
import StepperResetRequestButton from "../../components/buttons/StepperResetRequestButton";

const RequestSteps = [
  "Import CSV",
  "Review Candidates",
  "Candidates Submitted",
];

const MultiCandidateRequestPageContent = ({
  activeStep,
  setActiveStep,
  setDefaultState,
}) => {
  useEffect(() => {
    return () => setDefaultState();
  }, []);

  return (
    <RequestWrapperPage
      steps={RequestSteps}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      createFormComponent={<CreateMultiCandidateRequestForm />}
      reviewComponent={<MultiCandidateRequestSummary review />}
      summaryComponent={<MultiCandidateRequestSummary />}
      stepperButtons={<StepperButtons />}
      stepperResetBtn={
        <StepperResetRequestButton clearData={setDefaultState} />
      }
    />
  );
};

export default connect(
  (state) => ({activeStep: state.multiCandidateRequest.get("activeStep")}),
  {setDefaultState, setActiveStep}
)(memo(MultiCandidateRequestPageContent));
