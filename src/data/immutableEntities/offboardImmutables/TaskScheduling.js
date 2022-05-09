import {Record} from "immutable";

const TaskScheduling = new Record({
  scheduleType: "",
  scheduleDate: "",
  scheduleEpoch: null,
  scheduleTimeZone: "",
  scheduleTimeZoneId: "",
  isNotifyTerminationsChecked: true,
  isNotifyTerminationsDisabled: false,
});

export default TaskScheduling;
