import {connect} from "react-redux";
import {
  setNonLpEmail,
  setNonLpEmailError,
} from "../../../data/redux/candidateRequest/candidateRequestActions";
import NonLpEmailInput from "../../../components/formBlocks/candidateDetails/NonLpEmailInput";

const mapStateToProps = (state) => ({
  nonLpEmail: state.candidateRequest.getIn(["candidateDetails", "nonLpEmail"]),
  nonLpEmailError: state.candidateRequest.get("nonLpEmailError"),
});

const mapDispatchToProps = {
  setNonLpEmail,
  setNonLpEmailError,
};

const NonLpEmailInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NonLpEmailInput);

export default NonLpEmailInputContainer;
