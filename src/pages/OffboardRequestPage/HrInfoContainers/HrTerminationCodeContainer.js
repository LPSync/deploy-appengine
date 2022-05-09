import {connect} from "react-redux";
import HrTerminationCodeSelect from "../../../components/formBlocks/hrInfo/HrTerminationCodeSelect";
import {setHrTerminationCode} from "../../../data/redux/offboardRequest/offboardRequestActions";

const HrTerminationCodeContainer = connect(
  (state) => ({
    value: state.offboardRequest.getIn(["hrInformation", "hrTerminationCode"]),
    error: state.offboardRequest.get("hrTerminationCodeError"),
  }),
  {
    onValueChange: setHrTerminationCode,
  }
)(HrTerminationCodeSelect);

export default HrTerminationCodeContainer;
