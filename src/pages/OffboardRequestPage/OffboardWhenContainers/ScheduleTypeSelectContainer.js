import {connect} from "react-redux";
import {
  setScheduleType,
  setScheduleTypeError,
  setIsNotifyTerminationsChecked,
  setIsNotifyTerminationsDisabled,
} from "../../../data/redux/offboardRequest/offboardRequestActions";
import ScheduleTypeSelect from "../../../components/formBlocks/offboardWhenDetails/ScheduleTypeSelect";

const mapStateToProps = (state) => ({
  scheduleType: state.offboardRequest.getIn(["taskScheduling", "scheduleType"]),
  scheduleTypeError: state.offboardRequest.get(["scheduleTypeError"]),
});

const mapDispatchToProps = {
  setScheduleType,
  setScheduleTypeError,
  setIsNotifyTerminationsChecked,
  setIsNotifyTerminationsDisabled,
};

const ScheduleTypeSelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleTypeSelect);

export default ScheduleTypeSelectContainer;
