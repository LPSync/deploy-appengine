import {typesWithPrefix} from "../../helper/helpers";

const TaskManagerActonTypes = {
  SET_ALL_TASKS_DATA: "SET_ALL_TASKS_DATA",
  ADD_TASK_DATA: "ADD_TASK_DATA",
  SET_IS_DRAWER_OPEN: "SET_IS_DRAWER_OPEN",
  SET_SELECTED_TASK_DATA: "SET_SELECTED_TASK_DATA",
  SET_VIEW_TASK_TYPE_DETAILS: "SET_VIEW_TASK_TYPE_DETAILS"
};

export default typesWithPrefix("TASK_MANAGER_")(
  TaskManagerActonTypes
);
