import {connect} from "react-redux";
import {
  setJobCode,
  setJobError,
} from "../../../data/redux/candidateRequest/candidateRequestActions";
import JobCode from "../../../components/formBlocks/candidateDetails/JobCode";

const mapStateToProps = (state) => ({
  jobCode: state.candidateRequest.getIn(["candidateDetails", "job", "jobCode"]),
  jobError: state.candidateRequest.get("jobError"),
  locationCountryCode: state.candidateRequest.getIn([
    "requisitionDetails",
    "location",
    "locationCountryCode",
  ]),
  employeeType: state.candidateRequest.getIn([
    "requisitionDetails",
    "employeeType",
  ]),
  isFilledByRequisition: state.candidateRequest.get("isFilledByRequisition"),
});

const mapDispatchToProps = {
  setJobCode,
  setJobError,
};

const JobCodeContainer = connect(mapStateToProps, mapDispatchToProps)(JobCode);

export default JobCodeContainer;
