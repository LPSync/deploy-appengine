import {connect} from "react-redux";
import TimeZoneSearch from "../../../components/formBlocks/hrInfo/TimeZoneSearch";
import {
  setHrCity,
  setHrLocationLat,
  setHrLocationLong,
  setHrTimeZone,
  setHrTimeZoneId,
} from "../../../data/redux/offboardRequest/offboardRequestActions";

const HrTimeZoneContainer = connect(
  (state) => ({
    hrTimeZoneError: state.offboardRequest.get("hrTimeZoneError"),
  }),
  {
    setHrCity,
    setHrTimeZone,
    setHrTimeZoneId,
    setHrLocationLat,
    setHrLocationLong,
  }
)(TimeZoneSearch);

export default HrTimeZoneContainer;
