import {connect} from "react-redux";
import {setUnassignLicenses} from "../../../data/redux/offboardRequest/offboardRequestActions";
import LicensesCheck from "../../../components/formBlocks/dataLicensesDevicesDetails/LicensesCheck";

const mapStateToProps = (state) => ({
  selectedOffboardUser: state.offboardRequest.getIn([
    "offboardDetails",
    "selectedOffboardUser",
  ]),
  unassignLicenses: state.offboardRequest.getIn([
    "licenseRemoval",
    "unassignLicenses",
  ]),
});

const mapDispatchToProps = {
  setUnassignLicenses,
};

const LicensesCheckContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LicensesCheck);

export default LicensesCheckContainer;
