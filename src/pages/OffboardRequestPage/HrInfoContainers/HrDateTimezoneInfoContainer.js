import {connect} from "react-redux";
import HrDateTimezoneInfo from "../../../components/formBlocks/hrInfo/HrDateTimezoneInfo";

const HrDateTimezoneInfoContainer = connect(
  (state) => ({
    timeZone: state.offboardRequest.getIn(["hrInformation", "hrTimeZone"]),
    city: state.offboardRequest.get("hrCity"),
  }),
  {}
)(HrDateTimezoneInfo);

export default HrDateTimezoneInfoContainer;
