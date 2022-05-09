import {connect} from "react-redux";
import {
  setJamfDevicesData,
  setGoogleDevicesData,
} from "../../../data/redux/offboardRequest/offboardRequestActions";
import DevicesCheck from "../../../components/formBlocks/dataLicensesDevicesDetails/DevicesCheck";

const mapStateToProps = (state) => ({
  selectedOffboardUser: state.offboardRequest.getIn([
    "offboardDetails",
    "selectedOffboardUser",
  ]),
  jamfDevicesData: state.offboardRequest.getIn([
    "deviceUnassign",
    "jamfDevicesData",
  ]),
  googleDevicesData: state.offboardRequest.getIn([
    "deviceUnassign",
    "googleDevicesData",
  ]),
});

const mapDispatchToProps = {
  setJamfDevicesData,
  setGoogleDevicesData,
};

const DevicesCheckContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DevicesCheck);

export default DevicesCheckContainer;
