import {isImmutable, Record} from "immutable";
import {deepCopy} from "../../helper/helpers";
import Job from "./Job";

const defaultProps = {
  firstName: "",
  username: "",
  lastName: "",
  nonLpEmail: "",
  job: new Job(),
  selectedCompany: "",
  officeNumber: "",
  mobileNumber: "",
};

class CandidateDetails extends (new Record(defaultProps)) {
  constructor(props) {
    if (!props) {
      super(props);
      return;
    }
    props = deepCopy(props);
    if (!isImmutable(props)) {
      if (props && props.job && !isImmutable(props.job)) {
        props.job = new Job(props.job);
      }
    }
    super(props);
  }
}

export default CandidateDetails;
