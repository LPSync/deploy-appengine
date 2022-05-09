import { connect } from "react-redux";
import { setHiringManager, setHiringManagerError } from "../../../data/redux/candidateRequest/candidateRequestActions";
import HiringManagerSelect from "../../../components/formBlocks/requisitionDetails/HiringManagerSelect";

const mapStateToProps = state => ({
  hiringManager: state.candidateRequest.getIn(["requisitionDetails", "hiringManager"])?.toJS() || null,
  hiringManagerError: state.candidateRequest.get("hiringManagerError"),
  isFilledByRequisition: state.candidateRequest.get("isFilledByRequisition")
});

const mapDispatchToProps = { setHiringManager, setHiringManagerError };

const HiringManagerSelectContainer = connect(mapStateToProps, mapDispatchToProps)(HiringManagerSelect);

export default HiringManagerSelectContainer;
