import React, {memo} from "react";
import {Button} from "@material-ui/core";

const StepperNextButton = ({activeStep, steps, ...props}) => {
  return (
    <Button variant="contained" color="secondary" {...props}>
      {activeStep === steps?.length - 2 ? "CONFIRM" : "NEXT"}
    </Button>
  );
};

export default memo(StepperNextButton);
