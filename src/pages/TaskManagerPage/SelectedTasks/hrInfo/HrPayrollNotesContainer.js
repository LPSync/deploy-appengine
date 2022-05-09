import {connect} from "react-redux";
import { setHrNotes } from "../../../../data/redux/taskManagerHrInfo/taskManagerHrInfoActions";
import HrPayrollNotesInput from "../../../../components/formBlocks/hrInfo/HrPayrollNotesInput";

const HrPayrollNotesContainer = connect(
  state => ({
    value: state.taskManagerHrInfo.getIn(["hrInformation", "hrNotes"]),
  }),
  { onValueChange: setHrNotes },
)(HrPayrollNotesInput);

export default HrPayrollNotesContainer;