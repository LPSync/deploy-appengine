import React from "react";
import {connect} from "react-redux";
import {
  setHrDateError, setHrSelectedDate,
} from "../../../../data/redux/taskManagerHrInfo/taskManagerHrInfoActions";
import HrDateInput from "../../../../components/formBlocks/hrInfo/HrDateInput";

const HrDateContainer = connect(
  state => ({
    value: state.taskManagerHrInfo.getIn(["hrInformation", "hrSelectedDate"]),
    error: state.taskManagerHrInfo.get("hrDateError")
  }),
  {
    onValueChange: setHrSelectedDate,
    setError: setHrDateError
  },
)(HrDateInput);

export default HrDateContainer;