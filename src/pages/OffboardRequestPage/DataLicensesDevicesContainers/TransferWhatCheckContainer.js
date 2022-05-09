import {connect} from "react-redux";
import {
  setIsDriveChecked,
  setIsCalendarChecked,
  setIsDataStudioChecked,
} from "../../../data/redux/offboardRequest/offboardRequestActions";
import TransferWhatCheck from "../../../components/formBlocks/dataLicensesDevicesDetails/TransferWhatCheck";

const mapStateToProps = (state) => ({
  isDriveChecked: state.offboardRequest.getIn([
    "dataTransfer",
    "isDriveChecked",
  ]),
  isCalendarChecked: state.offboardRequest.getIn([
    "dataTransfer",
    "isCalendarChecked",
  ]),
  isDataStudioChecked: state.offboardRequest.getIn([
    "dataTransfer",
    "isDataStudioChecked",
  ]),
});

const mapDispatchToProps = {
  setIsDriveChecked,
  setIsCalendarChecked,
  setIsDataStudioChecked,
};

const TransferWhatCheckContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferWhatCheck);

export default TransferWhatCheckContainer;
