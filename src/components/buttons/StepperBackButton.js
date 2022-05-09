import React, {memo} from "react";
import {Button} from "@material-ui/core";

const StepperBackButton = ({...props}) => {
  return (
    <Button variant="outlined" {...props}>
      BACK
    </Button>
  );
};

export default memo(StepperBackButton);
