import React, {memo, useContext} from "react";
import Button from "@material-ui/core/Button";
import {OffboardEmployeeContext} from "./OffboardEmployeeContextProvider";
import {connect} from "react-redux";
import {setSelectedOffboardUser} from "../../data/redux/offboardRequest/offboardRequestActions";

const StepperResetBtn = ({handleReset, setSelectedOffboardUser}) => {
  const {
    setSelectedTransferUser,
    setTaskScheduleEpoch,
    setOffboardingType,
    setIsSelectedLoading,
    setSelectedDate,
    setHrTerminationCode,
    setHrTerminationType,
    setHrSelectedDate,
    setIsBtnDisabled,
  } = useContext(OffboardEmployeeContext);

  const userReset = () => {
    setSelectedOffboardUser("");
    setSelectedTransferUser("");
    setTaskScheduleEpoch(null);
    setOffboardingType("");
    setSelectedDate("");
    setHrTerminationCode("");
    setHrTerminationType("");
    setHrSelectedDate("");
    setIsSelectedLoading(false);
    setIsBtnDisabled(false);
    handleReset();
  };
  return (
    <Button variant="contained" color="secondary" onClick={userReset}>
      Create Another Request
    </Button>
  );
};

export default connect(() => ({}), {setSelectedOffboardUser})(
  memo(StepperResetBtn)
);
