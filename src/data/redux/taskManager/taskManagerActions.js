import TaskManagerActonTypes from "./taskManagerActonTypes";

export const setAllTasksData = (allTasksData) => ({
  type: TaskManagerActonTypes.SET_ALL_TASKS_DATA,
  payload: {allTasksData},
});

export const addTaskData = (taskData) => ({
  type: TaskManagerActonTypes.ADD_TASK_DATA,
  payload: {taskData},
});

export const setIsDrawerOpen = (isDrawerOpen) => ({
  type: TaskManagerActonTypes.SET_IS_DRAWER_OPEN,
  payload: {isDrawerOpen},
});

export const setSelectedTaskData = (selectedTaskData) => ({
  type: TaskManagerActonTypes.SET_SELECTED_TASK_DATA,
  payload: {selectedTaskData},
});

export const setViewTaskTypeDetails = (viewTaskTypeDetails) => ({
  type: TaskManagerActonTypes.SET_VIEW_TASK_TYPE_DETAILS,
  payload: {viewTaskTypeDetails},
});
