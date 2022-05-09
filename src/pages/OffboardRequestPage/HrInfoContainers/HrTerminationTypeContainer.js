import {connect} from "react-redux";
import HrTerminationTypeSelect from "../../../components/formBlocks/hrInfo/HrTerminationTypeSelect";
import {setHrTerminationType} from "../../../data/redux/offboardRequest/offboardRequestActions";

const HrTerminationTypeContainer = connect(
  (state) => ({
    value: state.offboardRequest.getIn(["hrInformation", "hrTerminationType"]),
  }),
  {
    onValueChange: setHrTerminationType,
  }
)(HrTerminationTypeSelect);

export default HrTerminationTypeContainer;
