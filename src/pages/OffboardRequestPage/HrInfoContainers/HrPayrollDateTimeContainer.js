import {connect} from "react-redux";
import {setHrPayrollEpoch} from "../../../data/redux/offboardRequest/offboardRequestActions";
import HrPayrollDateTimeSelect from "../../../components/formBlocks/hrInfo/HrPayrollDateTimeSelect";

const HrPayrollDateTimeContainer = connect(
  (state) => ({
    hrLocationLat: state.offboardRequest.get("hrLocationLat"),
    hrLocationLong: state.offboardRequest.get("hrLocationLong"),
    hrSelectedDate: state.offboardRequest.getIn([
      "hrInformation",
      "hrSelectedDate",
    ]),
  }),
  {setHrPayrollEpoch}
)(HrPayrollDateTimeSelect);

export default HrPayrollDateTimeContainer;
