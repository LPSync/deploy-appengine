import OnboardingDashboardActonTypes from "./onboardingDashboardActonTypes";

export const setSelectedTaskData = (selectedTaskData) => ({
  type: OnboardingDashboardActonTypes.SET_SELECTED_TASK_DATA,
  payload: {selectedTaskData},
});

export const setIsDrawerOpen = (isDrawerOpen) => ({
  type: OnboardingDashboardActonTypes.SET_IS_DRAWER_OPEN,
  payload: {isDrawerOpen},
});

export const setViewTaskTypeDetails = (viewTaskTypeDetails) => ({
  type: OnboardingDashboardActonTypes.SET_VIEW_TASK_TYPE_DETAILS,
  payload: {viewTaskTypeDetails},
});

export const setIsReqSubmitted = (isReqSubmitted) => ({
  type: OnboardingDashboardActonTypes.SET_IS_REQ_SUBMITTED,
  payload: {isReqSubmitted},
});

export const setIsCandidateSubmitted = (isCandidateSubmitted) => ({
  type: OnboardingDashboardActonTypes.SET_IS_CANDIDATE_SUBMITTED,
  payload: {isCandidateSubmitted},
});