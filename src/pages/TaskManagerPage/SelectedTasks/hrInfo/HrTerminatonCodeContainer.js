import React from "react";
import {connect} from "react-redux";
import HrTerminationCodeSelect from "../../../../components/formBlocks/hrInfo/HrTerminationCodeSelect";
import {
  setHrTerminationCode,
  setHrTerminationCodeError,
} from "../../../../data/redux/taskManagerHrInfo/taskManagerHrInfoActions";

const HrTerminationCodeContainer = connect(
  state => ({
    value: state.taskManagerHrInfo.getIn(["hrInformation", "hrTerminationCode"]),
    error: state.taskManagerHrInfo.get("hrTerminationCodeError"),
  }),
  {
    onValueChange: setHrTerminationCode,
    setError: setHrTerminationCodeError
  },
)(HrTerminationCodeSelect);

export default HrTerminationCodeContainer;