import { OrderedMap } from "immutable";
import UserDirectoryActionTypes from "./userDirectoryActionTypes";
import UserDirectorySearchTypes from "../../constants/UserDirectorySearchTypes";

const defaultState = OrderedMap({
  searchQuery: "",
  searchType: UserDirectorySearchTypes.ALL,
  usersData: [],
  userData: null,
  costCenters: [],
  userDirectReports: null,
  googleUserInfo: [],
  selectedAuditUser: null,
  isLoading: false,
  userBadges: null,
  isAuditDrawerOpen: false,
  isGoogleGroupsDrawerOpen: false,
  isAdGroupsDrawerOpen: false,
  isAppMembershipsDrawerOpen: false,
  disabledSearchResults: true,
});

const userDirectoryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UserDirectoryActionTypes.SET_SEARCH_QUERY:
      return state.set("searchQuery", action.payload.searchQuery);

    case UserDirectoryActionTypes.SET_SEARCH_TYPE:
      return state.set("searchType", action.payload.searchType);

    case UserDirectoryActionTypes.SET_USERS_DATA:
      return state.set("usersData", action.payload.usersData);

    case UserDirectoryActionTypes.SET_USER_DATA:
      return state.set("userData", action.payload.userData);

    case UserDirectoryActionTypes.SET_USER_BADGES:
      return state.set("userBadges", action.payload.userBadges);

    case UserDirectoryActionTypes.SET_COST_CENTERS:
      return state.set("costCenters", action.payload.costCenters);

    case UserDirectoryActionTypes.SET_USER_DIRECT_REPORTS:
      return state.set("userDirectReports", action.payload.userDirectReports);

    case UserDirectoryActionTypes.SET_GOOGLE_USER_INFO:
      return state.set("googleUserInfo", action.payload.googleUserInfo);

    case UserDirectoryActionTypes.SET_SELECTED_AUDIT_USER:
      return state.set("selectedAuditUser", action.payload.selectedAuditUser);

    case UserDirectoryActionTypes.SET_IS_LOADING:
      return state.set("isLoading", action.payload.isLoading);

    case UserDirectoryActionTypes.SET_IS_AUDIT_DRAWER_OPEN:
      return state.set("isAuditDrawerOpen", action.payload.isAuditDrawerOpen);

    case UserDirectoryActionTypes.SET_IS_GOOGLE_GROUPS_DRAWER_OPEN:
      return state.set("isGoogleGroupsDrawerOpen", action.payload.isGoogleGroupsDrawerOpen);

    case UserDirectoryActionTypes.SET_IS_AD_GROUPS_DRAWER_OPEN:
      return state.set("isAdGroupsDrawerOpen", action.payload.isAdGroupsDrawerOpen);

    case UserDirectoryActionTypes.SET_IS_APP_MEMBERSHIPS_DRAWER_OPEN:
      return state.set("isAppMembershipsDrawerOpen", action.payload.isAppMembershipsDrawerOpen);

    case UserDirectoryActionTypes.SET_DISABLED_SEARCH_RESULTS:
      return state.set("disabledSearchResults", action.payload.disabledSearchResults);

    default:
      return state;
  }
};

export default userDirectoryReducer;
