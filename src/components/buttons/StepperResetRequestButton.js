import React, { memo } from "react";
import Button from "@material-ui/core/Button";

const StepperResetRequestButton = ({ handleReset, clearData }) => {
  const useReset = () => {
    clearData();
    handleReset();
  };

  return (
    <Button variant="contained" color="secondary" onClick={useReset}>
      Create Another Request
    </Button>
  );
};

export default memo(StepperResetRequestButton);
