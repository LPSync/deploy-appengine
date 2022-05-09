import { connect } from "react-redux";
import { setLocation, setLocationError } from "../../../data/redux/candidateRequest/candidateRequestActions";
import LocationSelect from "../../../components/formBlocks/requisitionDetails/LocationSelect";

const mapStateToProps = state => ({
  location: state.candidateRequest.getIn(["requisitionDetails", "location"])?.toJS() || null,
  locationError: state.candidateRequest.get("locationError"),
  isFilledByRequisition: state.candidateRequest.get("isFilledByRequisition")
});

const mapDispatchToProps = { setLocation, setLocationError };

export default connect(mapStateToProps, mapDispatchToProps)(LocationSelect);
