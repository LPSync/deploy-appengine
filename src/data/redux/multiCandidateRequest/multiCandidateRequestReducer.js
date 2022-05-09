import {OrderedMap} from "immutable";
import MultiCandidateRequestActonTypes from "./multiCandidateRequestActonTypes";

const defaultState = OrderedMap({
  csvData: null,
  csvFileError: "",
  selectedTasks: null,
  selectedIds: [],
  activeStep: 0,
  existingId: null
});

const multiCandidateRequestReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MultiCandidateRequestActonTypes.SET_CSV_DATA:
      return state.set("csvData", action.payload.csvData);

    case MultiCandidateRequestActonTypes.SET_CSV_FILE_ERROR:
      return state.set("csvFileError", action.payload.csvFileError);

    case MultiCandidateRequestActonTypes.SET_SELECTED_TASK_IDS:
      return state.set("selectedTaskIds", action.payload.selectedTaskIds);

    case MultiCandidateRequestActonTypes.SET_SELECTED_TASKS:
      return state.set("selectedTasks", action.payload.selectedTasks);

    case MultiCandidateRequestActonTypes.SET_SELECTED_TASK_USERNAME:
      return state.update("selectedTasks", selectedTasks => selectedTasks.map(task => {
        if (task.id === action.payload.id)
          return {...task, username: action.payload.username};
        else
          return task;
      }));

    case MultiCandidateRequestActonTypes.SET_EXISTING_ID:
      return state.set("existingId", action.payload.existingId)

    case MultiCandidateRequestActonTypes.SET_DEFAULT_STATE:
      return defaultState;

    case MultiCandidateRequestActonTypes.SET_ACTIVE_STEP:
      return state.set("activeStep", action.payload.activeStep);
    default:
      return state;
  }
};

export default multiCandidateRequestReducer;
