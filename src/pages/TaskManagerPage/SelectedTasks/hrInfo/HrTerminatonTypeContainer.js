import React from "react";
import {connect} from "react-redux";
import HrTerminationTypeSelect from "../../../../components/formBlocks/hrInfo/HrTerminationTypeSelect";
import {
  setHrTerminationCodeError,
  setHrTerminationType,
} from "../../../../data/redux/taskManagerHrInfo/taskManagerHrInfoActions";

const HrTerminationTypeContainer = connect(
  state => ({
    value: state.taskManagerHrInfo.getIn(["hrInformation", "hrTerminationType"]),
    error: state.taskManagerHrInfo.get("hrTerminationTypeError"),
  }),
  {
    onValueChange: setHrTerminationType,
    setError: setHrTerminationCodeError
  },
)(HrTerminationTypeSelect);

export default HrTerminationTypeContainer;