import {connect} from "react-redux";
import {setIsGoogleAccountNeeded} from "../../../data/redux/candidateRequest/candidateRequestActions";
import GoogleAccountCheck from "../../../components/formBlocks/googleAccount/GoogleAccountCheck";

const mapStateToProps = (state) => ({
  isGoogleAccountNeeded: state.candidateRequest.getIn([
    "additionalInformation",
    "isGoogleAccountNeeded",
  ]),
});

const mapDispatchToProps = {
  setIsGoogleAccountNeeded,
};

const GoogleAccountCheckContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleAccountCheck);

export default GoogleAccountCheckContainer;
