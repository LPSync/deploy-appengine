import {connect} from "react-redux";
import {setRequisitionTypeError} from "../../../data/redux/candidateRequest/candidateRequestActions";
import RequisitionTypeSelect from "../../../components/formBlocks/requisitionDetails/RequisitionTypeSelect";

const mapStateToProps = (state) => ({
  requisitionType:
    state.candidateRequest
      .getIn(["requisitionDetails", "requisitionType"])
      ?.toJS() || null,
  requisitionTypeError: state.candidateRequest.get("requisitionTypeError"),
});

const mapDispatchToProps = {setRequisitionTypeError};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequisitionTypeSelect);
