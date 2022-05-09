import {Record} from "immutable";

const DataTransfer = new Record({
  selectedTransferUser: "",
  isDriveChecked: true,
  isCalendarChecked: true,
  isDataStudioChecked: true,
  googleUserAliases: [],
});

export default DataTransfer;
