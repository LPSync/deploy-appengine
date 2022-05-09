import {connect} from "react-redux";
import OfficeNumberInput from "../../../components/formBlocks/candidateDetails/OfficeNumberInput";
import {setOfficeNumber} from "../../../data/redux/candidateRequest/candidateRequestActions";

const mapStateToProps = (state) => ({
  officeNumber: state.candidateRequest.getIn([
    "candidateDetails",
    "officeNumber",
  ]),
});

const mapDispatchToProps = {
  setOfficeNumber,
};

const OfficeNumberInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficeNumberInput);

export default OfficeNumberInputContainer;
