import {Record} from "immutable";

const HrInformation = new Record({
  hrTerminationCode: "",
  hrTerminationType: "",
  hrSelectedDate: "",
  hrPayrollEpoch: null,
  hrTimeZone: "",
  hrTimeZoneId: "",
  hrNotes: "",
});

export default HrInformation;