import MultiCandidateRequestActonTypes from "./multiCandidateRequestActonTypes";

export const setCSVData = (csvData) => ({
  type: MultiCandidateRequestActonTypes.SET_CSV_DATA,
  payload: {csvData},
});

export const setCSVFileError = (csvFileError) => ({
  type: MultiCandidateRequestActonTypes.SET_CSV_FILE_ERROR,
  payload: {csvFileError},
});

export const setSelectedTaskIds = (selectedTaskIds) => ({
  type: MultiCandidateRequestActonTypes.SET_SELECTED_TASK_IDS,
  payload: {selectedTaskIds},
});

export const setSelectedTasks = (selectedTasks) => ({
  type: MultiCandidateRequestActonTypes.SET_SELECTED_TASKS,
  payload: {selectedTasks},
});

export const setSelectedTaskUsername = (id, username) => ({
  type: MultiCandidateRequestActonTypes.SET_SELECTED_TASK_USERNAME,
  payload: {id, username},
});

export const setExistingId = (existingId) => ({
  type: MultiCandidateRequestActonTypes.SET_EXISTING_ID,
  payload: {existingId},
});

export const setDefaultState = () => ({
  type: MultiCandidateRequestActonTypes.SET_DEFAULT_STATE,
});

export const setActiveStep = (activeStep) => ({
  type: MultiCandidateRequestActonTypes.SET_ACTIVE_STEP,
  payload: {activeStep},
});