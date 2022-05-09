import {isImmutable, Record} from "immutable";
import {deepCopy} from "../../helper/helpers";
import DataTransfer from "./DataTransfer";
import LicenseRemoval from "./LicenseRemoval";
import DeviceUnassign from "./DeviceUnassign";
import TaskScheduling from "./TaskScheduling";
import HrInformation from "../HrInformation";

const defaultProps = {
  selectedOffboardUser: "",
};

class OffboardDetails extends (new Record(defaultProps)) {
  constructor(props) {
    if (!props) {
      super(props);
      return;
    }
    props = deepCopy(props);
    if (!isImmutable(props)) {
      if (props && props.dataTransfer && !isImmutable(props.dataTransfer)) {
        props.dataTransfer = new DataTransfer(props.dataTransfer);
      }
      if (props && props.licenseRemoval && !isImmutable(props.licenseRemoval)) {
        props.licenseRemoval = new LicenseRemoval(props.licenseRemoval);
      }
      if (props && props.deviceUnassign && !isImmutable(props.deviceUnassign)) {
        props.deviceUnassign = new DeviceUnassign(props.deviceUnassign);
      }
      if (props && props.taskScheduling && !isImmutable(props.taskScheduling)) {
        props.taskScheduling = new TaskScheduling(props.taskScheduling);
      }
      if (props && props.hrInformation && !isImmutable(props.hrInformation)) {
        props.hrInformation = new HrInformation(props.hrInformation);
      }
    }
    super(props);
  }
}

export default OffboardDetails;
