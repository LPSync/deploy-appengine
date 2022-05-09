import React, {
  Children,
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {connect} from "react-redux";
import {Box, makeStyles} from "@material-ui/core";
import RequestStepper from "../../components/requestWrapper/RequestStepper";
import {AuthUserContext} from "../../AuthUserContextProvider";
import OffboardRequestBottomBar from "./OffboardRequestBottomBar";
import RequestStepperButtonWrapper from "../../components/requestWrapper/RequestStepperButtonWrapper";
import CustomPortal from "../../components/CustomPortal";
import MissedInputModal from "../../components/modals/MissedInputModal";
import {setIsWarningModalOpen} from "../../data/redux/offboardRequest/offboardRequestActions";

const mapStateToProps = (state) => ({
  isWarningModalOpen: state.offboardRequest.get("isWarningModalOpen"),
  warningModalMessage: state.offboardRequest.get("warningModalMessage"),
  isButtonDisabled: state.offboardRequest.get("isButtonDisabled"),
  isOffboarding: state.offboardRequest.get("isOffboarding"),
  selectedOffboardUser: state.offboardRequest.getIn([
    "offboardDetails",
    "selectedOffboardUser",
  ]),
});

const useStyles = makeStyles((theme) => ({
  contentBodyBox: {
    marginTop: theme.spacing(1),
    height: "100%",
    maxHeight: "calc(98vh - 370px)",
    overflow: "auto",
    [theme.breakpoints.up("lg")]: {
      maxHeight: "calc(98vh - 330px)",
    },
    [theme.breakpoints.up("xl")]: {
      maxHeight: "calc(98vh - 400px)",
    },
  },
  gradientPaper: {
    backgroundImage: theme.palette.background.gradient,
  },
}));

const stepTitles = [
  "Offboard Who",
  "Offboard When",
  "Data Transfer, Devices & Licenses",
  "HR Info",
  "Review & Confirm Request",
  "Request Completed",
];

const OffboardRequestWrapperPage = ({
  isWarningModalOpen,
  warningModalMessage,
  setIsWarningModalOpen,
  selectedOffboardUser,
  isOffboarding,
  isButtonDisabled,
  activeStep,
  setActiveStep,
  offboardWhoComponent,
  offboardWhenComponent,
  dataLicensesDevicesComponent,
  hrInfoComponent,
  reviewComponent,
  stepperButtons,
  stepperResetBtn,
  summaryComponent,
}) => {
  const classes = useStyles();
  const {permOffboardingHrInfo} = useContext(AuthUserContext);
  const [steps, setSteps] = useState();
  const isLastStep = useMemo(() => activeStep === steps?.length - 1, [activeStep, steps]);

  useEffect(() => {
    if (!isLastStep) {
      const contentBox = document.getElementById("content-box");
      contentBox.scroll(0, 0);
    }
  }, [isLastStep]);

  useEffect(() => {
    if (permOffboardingHrInfo) {
      setSteps(stepTitles);
    } else {
      const newTitles = stepTitles.filter((step) => step !== "HR Info");
      setSteps(newTitles);
    }
  }, [permOffboardingHrInfo]);

  const handleNext = useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep]);

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep, setActiveStep]);

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, [setActiveStep]);

  const stepperButtonWithProps = Children.map(stepperButtons, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        steps,
        activeStep,
        handleNext,
        handleBack,
        isButtonDisabled,
      });
    }
    return child;
  });

  const stepperResetBtnWithProps = Children.map(stepperResetBtn, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {handleReset});
    }
    return null;
  });

  const handleClose = () => {
    setIsWarningModalOpen(false);
  };

  return (
    <Box>
      <RequestStepper steps={steps} activeStep={activeStep} />
      <Box className={classes.gradientPaper} height={"10px"} width={"100%"} />
      <Box>
        {isLastStep ? (
          <>
            <RequestStepperButtonWrapper topMargin={3}>
              {stepperResetBtnWithProps}
            </RequestStepperButtonWrapper>

            {summaryComponent}
          </>
        ) : (
          <>
            <Box className={classes.contentBodyBox} id="content-box">
              {activeStep === 0
                ? offboardWhoComponent
                : activeStep === 1
                ? offboardWhenComponent
                : activeStep === 2
                ? dataLicensesDevicesComponent
                : activeStep === 3
                ? permOffboardingHrInfo
                  ? hrInfoComponent
                  : reviewComponent
                : (permOffboardingHrInfo ? activeStep === 4 : "unknown step")
                ? reviewComponent
                : "unknown step"}
            </Box>
          </>
        )}
      </Box>

      <MissedInputModal
        open={isWarningModalOpen}
        handleClose={handleClose}
        modalMsg={warningModalMessage}
      />

      {selectedOffboardUser && !isLastStep && !isOffboarding && (
        <CustomPortal>
          <OffboardRequestBottomBar>
            {stepperButtonWithProps}
          </OffboardRequestBottomBar>
        </CustomPortal>
      )}
    </Box>
  );
};

export default connect(mapStateToProps, {setIsWarningModalOpen})(
  memo(OffboardRequestWrapperPage)
);
