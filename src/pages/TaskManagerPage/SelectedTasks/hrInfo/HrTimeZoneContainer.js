import React from "react";
import { connect } from "react-redux";
import TimeZoneSearch from "../../../../components/formBlocks/hrInfo/TimeZoneSearch";
import {
  setHrCity,
  setHrLocationLat,
  setHrLocationLong,
  setHrTimeZone,
  setHrTimeZoneId,
} from "../../../../data/redux/taskManagerHrInfo/taskManagerHrInfoActions";

const HrTimeZoneContainer = connect(
  state => ({
    hrTimeZoneError: state.taskManagerHrInfo.get("hrTimeZoneError"),
  }),
  {
    setHrCity, setHrTimeZone, setHrTimeZoneId, setHrLocationLat, setHrLocationLong,
  },
)(TimeZoneSearch);

export default HrTimeZoneContainer;