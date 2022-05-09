import React, {
  Children,
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useEffect,
} from "react";
import {Box, makeStyles} from "@material-ui/core";
import RequestStepper from "./RequestStepper";
import RequestStepperButtonWrapper from "./RequestStepperButtonWrapper";
import CustomPortal from "../CustomPortal";

const useStyles = makeStyles((theme) => ({
  contentBodyBox: {
    marginTop: theme.spacing(3),
    height: "100%",
    maxHeight: "51vh",
    overflow: "auto",
    [theme.breakpoints.up("xl")]: {
      maxHeight: "57vh",
    },
  },
  gradientPaper: {
    backgroundImage: theme.palette.background.gradient,
  },
}));

const RequestWrapperPage = ({
  activeStep,
  setActiveStep,
  steps,
  createFormComponent,
  reviewComponent,
  stepperButtons,
  stepperResetBtn,
  summaryComponent,
}) => {
  const classes = useStyles();

  const isLastStep = activeStep === steps?.length - 1;

  useEffect(() => {
    if (!isLastStep) {
      const contentBox = document.getElementById("content-box");
      contentBox.scroll(0, 0);
    }
  }, [activeStep, isLastStep]);

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
      return cloneElement(child, {steps, activeStep, handleNext, handleBack});
    }
    return child;
  });
  const stepperResetBtnWithProps = Children.map(stepperResetBtn, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {handleReset});
    }
    return null;
  });

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
                ? createFormComponent
                : activeStep === 1
                ? reviewComponent
                : "unknown step"}
            </Box>

            <CustomPortal>
              <Box px={2} mx={2}>
              <RequestStepperButtonWrapper>
                {stepperButtonWithProps}
              </RequestStepperButtonWrapper>
              </Box>
            </CustomPortal>
          </>
        )}
      </Box>
    </Box>
  );
};

export default memo(RequestWrapperPage);
