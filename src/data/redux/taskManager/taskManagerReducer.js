import { OrderedMap } from "immutable";
import TaskManagerActonTypes from "./taskManagerActonTypes";

const defaultState = OrderedMap({
  allTasksData: [],
  selectedTaskData: null,
  isDrawerOpen: false,
  viewTaskTypeDetails: "",
});

const taskManagerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TaskManagerActonTypes.SET_ALL_TASKS_DATA:
      return state.set("allTasksData", action.payload.allTasksData);
    case TaskManagerActonTypes.ADD_TASK_DATA:
      return state.update("allTasksData", allTasksData => [action.payload.taskData, ...allTasksData]);
    case TaskManagerActonTypes.SET_IS_DRAWER_OPEN:
      return state.set("isDrawerOpen", action.payload.isDrawerOpen);
    case TaskManagerActonTypes.SET_SELECTED_TASK_DATA:
      return state.set("selectedTaskData", action.payload.selectedTaskData);
    case TaskManagerActonTypes.SET_VIEW_TASK_TYPE_DETAILS:
      return state.set("viewTaskTypeDetails", action.payload.viewTaskTypeDetails);

    default:
      return state;
  }
};

export default taskManagerReducer;
