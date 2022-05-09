import { connect } from "react-redux";
import {
  setBusinessUnit,
  setBusinessUnitError,
  setDepartment, setDepartmentError
} from "../../../data/redux/candidateRequest/candidateRequestActions";
import BusinessUnitDeptSelect from "../../../components/formBlocks/requisitionDetails/BusinessUnitDeptSelect";

const mapStateToProps = state => ({
  businessUnit: state.candidateRequest.getIn(["requisitionDetails", "businessUnit"]),
  department: state.candidateRequest.getIn(["requisitionDetails", "department"]),
  businessUnitError: state.candidateRequest.get("businessUnitError"),
  departmentError: state.candidateRequest.get("departmentError"),
  isFilledByRequisition: state.candidateRequest.get("isFilledByRequisition")
});

const mapDispatchToProps = { setBusinessUnit, setDepartment, setBusinessUnitError, setDepartmentError };

const BusinessUnitDeptSelectContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessUnitDeptSelect);

export default BusinessUnitDeptSelectContainer;
