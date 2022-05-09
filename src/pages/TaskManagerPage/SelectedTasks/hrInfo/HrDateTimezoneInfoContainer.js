import React from "react";
import { connect } from "react-redux";
import HrDateTimezoneInfo from "../../../../components/formBlocks/hrInfo/HrDateTimezoneInfo";

const HrDateTimezoneInfoContainer = connect(
  state => ({
    timeZone: state.taskManagerHrInfo.getIn(["hrInformation", "hrTimeZone"]),
    city: state.taskManagerHrInfo.get("hrCity"),
  }),
  {},
)(HrDateTimezoneInfo);

export default HrDateTimezoneInfoContainer;