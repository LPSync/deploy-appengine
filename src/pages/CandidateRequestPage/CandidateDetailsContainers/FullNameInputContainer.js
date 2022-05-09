import {connect} from "react-redux";
import FullNameInput from "../../../components/formBlocks/candidateDetails/FullNameInput";
import {
  setFirstName,
  setFirstNameError,
  setLastName,
  setLastNameError,
} from "../../../data/redux/candidateRequest/candidateRequestActions";

const mapStateToProps = (state) => ({
  firstName: state.candidateRequest.getIn(["candidateDetails", "firstName"]),
  lastName: state.candidateRequest.getIn(["candidateDetails", "lastName"]),
  firstNameError: state.candidateRequest.get("firstNameError"),
  lastNameError: state.candidateRequest.get("lastNameError"),
});

const mapDispatchToProps = {
  setFirstName,
  setLastName,
  setFirstNameError,
  setLastNameError,
};

const FullNameInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FullNameInput);

export default FullNameInputContainer;
