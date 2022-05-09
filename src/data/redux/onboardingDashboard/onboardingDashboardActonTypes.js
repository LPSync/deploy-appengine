import {typesWithPrefix} from "../../helper/helpers";

const OnboardingDashboardActionTypes = {
  SET_SELECTED_TASK_DATA: "SET_SELECTED_TASK_DATA",
  SET_IS_DRAWER_OPEN: "SET_IS_DRAWER_OPEN",
  SET_VIEW_TASK_TYPE_DETAILS: "SET_VIEW_TASK_TYPE_DETAILS",
  SET_IS_REQ_SUBMITTED: "SET_IS_REQ_SUBMITTED",
  SET_IS_CANDIDATE_SUBMITTED: "SET_IS_CANDIDATE_SUBMITTED"
};

export default typesWithPrefix("ONBOARDING_DASHBOARD")(
  OnboardingDashboardActionTypes
);
