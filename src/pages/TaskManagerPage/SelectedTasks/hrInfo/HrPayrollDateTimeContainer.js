import React from "react";
import { connect } from "react-redux";
import { setHrPayrollEpoch } from "../../../../data/redux/taskManagerHrInfo/taskManagerHrInfoActions";
import HrPayrollDateTimeSelect from "../../../../components/formBlocks/hrInfo/HrPayrollDateTimeSelect";

const HrPayrollDateTimeContainer = connect(
  state => ({
    hrLocationLat: state.taskManagerHrInfo.get("hrLocationLat"),
    hrLocationLong: state.taskManagerHrInfo.get("hrLocationLong"),
    hrSelectedDate: state.taskManagerHrInfo.getIn(["hrInformation", "hrSelectedDate"]),
  }),
  {setHrPayrollEpoch},
)(HrPayrollDateTimeSelect);

export default HrPayrollDateTimeContainer;