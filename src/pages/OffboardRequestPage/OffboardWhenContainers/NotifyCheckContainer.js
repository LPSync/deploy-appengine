import {connect} from "react-redux";
import {setIsNotifyTerminationsChecked} from "../../../data/redux/offboardRequest/offboardRequestActions";
import NotificationCheck from "../../../components/formBlocks/offboardWhenDetails/NotificationCheck";

const mapStateToProps = (state) => ({
  isNotifyTerminationsChecked: state.offboardRequest.getIn([
    "taskScheduling",
    "isNotifyTerminationsChecked",
  ]),
  isNotifyTerminationsDisabled: state.offboardRequest.getIn([
    "taskScheduling",
    "isNotifyTerminationsDisabled",
  ]),
});

const mapDispatchToProps = {
  setIsNotifyTerminationsChecked,
};

const NotificationCheckContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationCheck);

export default NotificationCheckContainer;
