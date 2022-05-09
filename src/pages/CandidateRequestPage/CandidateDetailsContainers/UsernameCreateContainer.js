import {connect} from "react-redux";
import {
  setUsername,
  setUsernameError,
} from "../../../data/redux/candidateRequest/candidateRequestActions";
import UsernameCreate from "../../../components/formBlocks/candidateDetails/UsernameCreate";

const mapStateToProps = (state) => ({
  firstName: state.candidateRequest.getIn(["candidateDetails", "firstName"]),
  lastName: state.candidateRequest.getIn(["candidateDetails", "lastName"]),
  usernameError: state.candidateRequest.get("usernameError"),
});

const mapDispatchToProps = {
  setUsername,
  setUsernameError,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsernameCreate);
