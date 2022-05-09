import React, {memo} from "react";
import {makeStyles, Step, StepLabel, Stepper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&$activeIcon": {
      color: theme.palette.warning.main,
    },
    "&$completedIcon": {
      color: theme.palette.secondary.main,
    },
  },
  activeIcon: {},
  completedIcon: {},
}));

const RequestStepper = ({steps, activeStep}) => {
  const classes = useStyles();
  return (
    <Stepper activeStep={activeStep}>
      {steps?.map((label) => (
        <Step key={label}>
          <StepLabel
            StepIconProps={{
              classes: {
                root: classes.icon,
                active: classes.activeIcon,
                completed: classes.completedIcon,
              },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default memo(RequestStepper);
