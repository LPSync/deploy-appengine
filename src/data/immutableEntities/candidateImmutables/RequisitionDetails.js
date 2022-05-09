import {isImmutable, Record} from "immutable";
import {deepCopy} from "../../helper/helpers";
import RequisitionType from "./RequisitionType";
import HiringManager from "./HiringManager";
import Location from "./Location";

const defaultProps = {
  requisitionType: null,
  startDate: "",
  hiringManager: null,
  businessUnit: null,
  department: null,
  location: null,
  employeeType: "",
};

class RequisitionDetails extends (new Record(defaultProps)) {
  constructor(props) {
    if (!props) {
      super(props);
      return;
    }
    props = deepCopy(props);
    if (!isImmutable(props)) {
      if (
        props &&
        props.requisitionType &&
        !isImmutable(props.requisitionType)
      ) {
        props.requisitionType = new RequisitionType(props.requisitionType);
      }
      if (props && props.hiringManager && !isImmutable(props.hiringManager)) {
        props.hiringManager = new HiringManager(props.hiringManager);
      }
      if (props && props.location && !isImmutable(props.location)) {
        props.location = new Location(props.location);
      }
    }
    super(props);
  }
}

export default RequisitionDetails;
