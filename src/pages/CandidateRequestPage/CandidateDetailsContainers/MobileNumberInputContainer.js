import {connect} from "react-redux";
import {setMobileNumber} from "../../../data/redux/candidateRequest/candidateRequestActions";
import MobileNumberInput from "../../../components/formBlocks/candidateDetails/MobileNumberInput";

const mapStateToProps = (state) => ({
  mobileNumber: state.candidateRequest.getIn([
    "candidateDetails",
    "mobileNumber",
  ]),
});

const mapDispatchToProps = {
  setMobileNumber,
};

const MobileNumberInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileNumberInput);

export default MobileNumberInputContainer;
