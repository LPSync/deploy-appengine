import React, {memo} from "react";
import RequestWrapperPage from "../../components/requestWrapper/RequestWrapperPage";
import CreateCandidateRequestForm from "./CreateCandidateRequestForm";
import CandidateRequestSummary from "./CandidateRequestSummary";
import StepperButtons from "./StepperButtons";
import {
  setActiveStep,
  setDefaultState,
} from "../../data/redux/candidateRequest/candidateRequestActions";
import RequestSteps from "../../data/constants/RequestSteps";
import {connect} from "react-redux";
import StepperResetRequestButton from "../../components/buttons/StepperResetRequestButton";

const CandidateRequestPageContent = ({
  activeStep,
  setActiveStep,
  setDefaultState,
}) => {
  return (
    <RequestWrapperPage
      steps={RequestSteps}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      createFormComponent={<CreateCandidateRequestForm />}
      reviewComponent={<CandidateRequestSummary review />}
      summaryComponent={<CandidateRequestSummary />}
      stepperButtons={<StepperButtons />}
      stepperResetBtn={
        <StepperResetRequestButton clearData={setDefaultState} />
      }
    />
  );
};

export default connect(
  (state) => ({activeStep: state.candidateRequest.get("activeStep")}),
  {setDefaultState, setActiveStep}
)(memo(CandidateRequestPageContent));
