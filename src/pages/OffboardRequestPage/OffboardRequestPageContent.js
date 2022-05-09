import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveStep,
  setDefaultState,
} from "../../data/redux/offboardRequest/offboardRequestActions";
import OffboardRequestWrapperPage from "./OffboardRequestWrapperPage";
import OffboardWho from "./OffboardWhoContainers";
import StepperButtons from "./StepperButtons";
import OffboardWhen from "./OffboardWhenContainers";
import DataLicensesDevices from "./DataLicensesDevicesContainers";
import HrInformation from "./HrInfoContainers";
import OffboardRequestSummary from "./OffboardRequestSummary";
import StepperResetRequestButton from "../../components/buttons/StepperResetRequestButton";

export const getActiveStep = (state) => state?.offboardRequest.get("activeStep")
export const getOffboardingRequestObject = field => state => state?.offboardRequest.get(field).toJS();
export const getInOffboardingRequest = fieldPath => state => state?.offboardRequest.getIn(fieldPath);

const OffboardRequestPageContent = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector(getActiveStep);

  useEffect(() => {
    return () => dispatch(setDefaultState());
  }, [dispatch]);

  return (
    <OffboardRequestWrapperPage
      activeStep={activeStep}
      setActiveStep={step => dispatch(setActiveStep(step))}
      offboardWhoComponent={<OffboardWho />}
      offboardWhenComponent={<OffboardWhen />}
      dataLicensesDevicesComponent={<DataLicensesDevices />}
      hrInfoComponent={<HrInformation />}
      reviewComponent={<OffboardRequestSummary review />}
      summaryComponent={<OffboardRequestSummary />}
      stepperButtons={<StepperButtons />}
      stepperResetBtn={
        <StepperResetRequestButton clearData={() => dispatch(setDefaultState())} />
      }
    />
  );
};

export default memo(OffboardRequestPageContent);
