import {OrderedMap} from "immutable";
import OnboardingDashboardActonTypes from "./onboardingDashboardActonTypes";

const defaultState = OrderedMap({
  selectedTaskData: null,
  isDrawerOpen: false,
  viewTaskTypeDetails: "",
  isReqSubmitted: false,
  isCandidateSubmitted: false
});

const onboardingDashboardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case OnboardingDashboardActonTypes.SET_SELECTED_TASK_DATA:
      return state.set("selectedTaskData", action.payload.selectedTaskData);

    case OnboardingDashboardActonTypes.SET_IS_DRAWER_OPEN:
      return state.set("isDrawerOpen", action.payload.isDrawerOpen);

    case OnboardingDashboardActonTypes.SET_VIEW_TASK_TYPE_DETAILS:
      return state.set("viewTaskTypeDetails", action.payload.viewTaskTypeDetails);

    case OnboardingDashboardActonTypes.SET_IS_REQ_SUBMITTED:
      return state.set("isReqSubmitted", action.payload.isReqSubmitted);

    case OnboardingDashboardActonTypes.SET_IS_CANDIDATE_SUBMITTED:
      return state.set("isCandidateSubmitted", action.payload.isCandidateSubmitted);

    default:
      return state;
  }
};

export default onboardingDashboardReducer;
