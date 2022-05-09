import {connect} from "react-redux";
import {
  setScheduleDate,
  setScheduleDateError,
  setScheduleTimeZone,
  setScheduleTimeZoneId,
  setScheduleEpoch,
} from "../../../data/redux/offboardRequest/offboardRequestActions";
import ScheduleDateTimeInput from "../../../components/formBlocks/offboardWhenDetails/ScheduleDateTimeInput";

const mapStateToProps = (state) => ({
  scheduleDate: state.offboardRequest.getIn(["taskScheduling", "scheduleDate"]),
  scheduleTimeZone: state.offboardRequest.getIn([
    "taskScheduling",
    "scheduleTimeZone",
  ]),
  scheduleDateError: state.offboardRequest.get(["scheduleDateError"]),
  scheduleTimeZoneError: state.offboardRequest.get(["scheduleTimeZoneError"]),
});

const mapDispatchToProps = {
  setScheduleDate,
  setScheduleDateError,
  setScheduleTimeZone,
  setScheduleTimeZoneId,
  setScheduleEpoch,
};

const ScheduleDateTimeInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDateTimeInput);

export default ScheduleDateTimeInputContainer;
