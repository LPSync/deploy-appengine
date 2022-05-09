import {connect} from "react-redux";
import {setSelectedTransferUser} from "../../../data/redux/offboardRequest/offboardRequestActions";
import TransferWhoSelect from "../../../components/formBlocks/dataLicensesDevicesDetails/TransferWhoSelect";

const mapStateToProps = (state) => ({
  selectedTransferUser: state.offboardRequest.getIn([
    "dataTransfer",
    "selectedTransferUser",
  ]),
});

const mapDispatchToProps = {
  setSelectedTransferUser,
};

const TransferWhoSelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferWhoSelect);

export default TransferWhoSelectContainer;
