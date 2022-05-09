import { connect } from "react-redux";
import { setStartDate, setStartDateError } from "../../../data/redux/candidateRequest/candidateRequestActions";
import StartDateInput from "../../../components/formBlocks/requisitionDetails/StartDateInput";

const mapStateToProps = state => ({
  startDate: state.candidateRequest.getIn(["requisitionDetails", "startDate"]),
  startDateError: state.candidateRequest.get("startDateError"),
});

const mapDispatchToProps = { setStartDate, setStartDateError };

const StartDateInputContainer = connect(mapStateToProps, mapDispatchToProps)(StartDateInput);

export default StartDateInputContainer;
