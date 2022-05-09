import { connect } from "react-redux";
import {
  setFilledByRequisition,
  setJob,
  setRequisitionDetails,
  setRequisitionType,
} from "../../../data/redux/candidateRequest/candidateRequestActions";
import RequisitionSelectModal from "../../../components/modals/RequisitionSelectModal";

const mapStateToProps = state => ({
  requisitionType: state.candidateRequest.getIn(["requisitionDetails", "requisitionType"])?.toJS() || null,
});

const mapDispatchToProps = { setRequisitionType, setRequisitionDetails, setJob, setFilledByRequisition };

export default connect(mapStateToProps, mapDispatchToProps)(RequisitionSelectModal);
