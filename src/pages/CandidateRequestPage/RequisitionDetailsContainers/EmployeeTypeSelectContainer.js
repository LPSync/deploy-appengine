import {connect} from "react-redux";
import {
  setEmployeeType,
  setEmployeeTypeError,
  setIsGoogleAccountNeeded,
} from "../../../data/redux/candidateRequest/candidateRequestActions";
import EmployeeTypeSelect from "../../../components/formBlocks/requisitionDetails/EmployeeTypeSelect";

const mapStateToProps = (state) => ({
  employeeType: state.candidateRequest.getIn([
    "requisitionDetails",
    "employeeType",
  ]),
  employeeTypeError: state.candidateRequest.get("employeeTypeError"),
  isFilledByRequisition: state.candidateRequest.get("isFilledByRequisition"),
});

const mapDispatchToProps = {
  setEmployeeType,
  setEmployeeTypeError,
  setIsGoogleAccountNeeded,
};

const EmployeeTypeSelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeTypeSelect);

export default EmployeeTypeSelectContainer;
