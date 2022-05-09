import {connect} from "react-redux";
import {setHrNotes} from "../../../data/redux/offboardRequest/offboardRequestActions";
import HrPayrollNotesInput from "../../../components/formBlocks/hrInfo/HrPayrollNotesInput";

const HrPayrollNotesContainer = connect(
  (state) => ({
    value: state.offboardRequest.getIn(["hrInformation", "hrNotes"]),
  }),
  {onValueChange: setHrNotes}
)(HrPayrollNotesInput);

export default HrPayrollNotesContainer;
