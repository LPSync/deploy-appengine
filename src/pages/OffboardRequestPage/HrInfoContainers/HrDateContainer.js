import {connect} from "react-redux";
import {
  setHrDateError,
  setHrSelectedDate,
} from "../../../data/redux/offboardRequest/offboardRequestActions";
import HrDateInput from "../../../components/formBlocks/hrInfo/HrDateInput";

const HrDateContainer = connect(
  (state) => ({
    value: state.offboardRequest.getIn(["hrInformation", "hrSelectedDate"]),
    error: state.offboardRequest.get("hrDateError"),
  }),
  {
    onValueChange: setHrSelectedDate,
    setError: setHrDateError,
  }
)(HrDateInput);

export default HrDateContainer;
