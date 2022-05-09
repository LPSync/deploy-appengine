import {connect} from "react-redux";
import {
  setSelectedDevice,
  setSelectedDeviceError,
  setIsDeviceNoteConfirmed,
} from "../../../data/redux/candidateRequest/candidateRequestActions";
import DeviceSelect from "../../../components/formBlocks/deviceInformation/DeviceSelect";

const mapStateToProps = (state) => ({
  selectedDevice: state.candidateRequest.getIn([
    "additionalInformation",
    "selectedDevice",
  ]),
  selectedDeviceError: state.candidateRequest.get("selectedDeviceError"),
  isDeviceNoteConfirmed: state.candidateRequest.getIn([
    "additionalInformation",
    "isDeviceNoteConfirmed",
  ]),
});

const mapDispatchToProps = {
  setSelectedDevice,
  setSelectedDeviceError,
  setIsDeviceNoteConfirmed,
};

const DeviceSelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceSelect);

export default DeviceSelectContainer;
