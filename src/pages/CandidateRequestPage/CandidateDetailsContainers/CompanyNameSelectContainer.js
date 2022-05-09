import {connect} from "react-redux";
import {
  setSelectedCompany,
  setSelectedCompanyError,
} from "../../../data/redux/candidateRequest/candidateRequestActions";
import CompanyNameSelect from "../../../components/formBlocks/candidateDetails/CompanyNameSelect";

const mapStateToProps = (state) => ({
  selectedCompany: state.candidateRequest.getIn([
    "candidateDetails",
    "selectedCompany",
  ]),
  selectedCompanyError: state.candidateRequest.get("selectedCompanyError"),
});

const mapDispatchToProps = {
  setSelectedCompany,
  setSelectedCompanyError,
};

const CompanyNameSelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyNameSelect);

export default CompanyNameSelectContainer;
