import {connect} from "react-redux";
import {
  setJobCode,
  setJobError,
  setJobTitle,
} from "../../../data/redux/candidateRequest/candidateRequestActions";
import JobTitleInput from "../../../components/formBlocks/candidateDetails/JobTitleInput";

const mapStateToProps = (state) => ({
  jobCode:
    state.candidateRequest.getIn(["candidateDetails", "job", "jobCode"]) || "",
  jobTitle:
    state.candidateRequest.getIn(["candidateDetails", "job", "jobTitle"]) || "",
  jobError: state.candidateRequest.get("jobError"),
  isFilledByRequisition: state.candidateRequest.get("isFilledByRequisition"),
});

const mapDispatchToProps = {
  setJobCode,
  setJobTitle,
  setJobError,
};

const JobTitleInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobTitleInput);

export default JobTitleInputContainer;
