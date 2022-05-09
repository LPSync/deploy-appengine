import UserDirectoryActionTypes from "./userDirectoryActionTypes";

export const setSearchQuery = (searchQuery) => ({
  type: UserDirectoryActionTypes.SET_SEARCH_QUERY,
  payload: {searchQuery},
});


export const setSearchType = (searchType) => ({
  type: UserDirectoryActionTypes.SET_SEARCH_TYPE,
  payload: {searchType},
});

export const setUsersData = (usersData) => ({
  type: UserDirectoryActionTypes.SET_USERS_DATA,
  payload: {usersData},
});

export const setUserData = (userData) => ({
  type: UserDirectoryActionTypes.SET_USER_DATA,
  payload: {userData},
});

export const setUserBadges = (userBadges) => ({
  type: UserDirectoryActionTypes.SET_USER_BADGES,
  payload: {userBadges},
});

export const setCostCenters = (costCenters) => ({
  type: UserDirectoryActionTypes.SET_COST_CENTERS,
  payload: {costCenters},
});
export const setUserDirectReports = (userDirectReports) => ({
  type: UserDirectoryActionTypes.SET_USER_DIRECT_REPORTS,
  payload: {userDirectReports},
});

export const setGoogleUserInfo = (googleUserInfo) => ({
  type: UserDirectoryActionTypes.SET_GOOGLE_USER_INFO,
  payload: {googleUserInfo},
});

export const setIsLoading = (isLoading) => ({
  type: UserDirectoryActionTypes.SET_IS_LOADING,
  payload: {isLoading},
});

export const setSelectedAuditUser = (selectedAuditUser) => ({
  type: UserDirectoryActionTypes.SET_SELECTED_AUDIT_USER,
  payload: {selectedAuditUser},
});

export const setIsAuditDrawerOpen = (isAuditDrawerOpen) => ({
  type: UserDirectoryActionTypes.SET_IS_AUDIT_DRAWER_OPEN,
  payload: {isAuditDrawerOpen},
});

export const setIsGoogleGroupsDrawerOpen = (isGoogleGroupsDrawerOpen) => ({
  type: UserDirectoryActionTypes.SET_IS_GOOGLE_GROUPS_DRAWER_OPEN,
  payload: {isGoogleGroupsDrawerOpen},
});

export const setIsAdGroupsDrawerOpen = (isAdGroupsDrawerOpen) => ({
  type: UserDirectoryActionTypes.SET_IS_AD_GROUPS_DRAWER_OPEN,
  payload: {isAdGroupsDrawerOpen},
});

export const setIsAppMembershipsDrawerOpen = (isAppMembershipsDrawerOpen) => ({
  type: UserDirectoryActionTypes.SET_IS_APP_MEMBERSHIPS_DRAWER_OPEN,
  payload: {isAppMembershipsDrawerOpen},
});


export const setDisabledSearchResults = (disabledSearchResults) => ({
  type: UserDirectoryActionTypes.SET_DISABLED_SEARCH_RESULTS,
  payload: {disabledSearchResults},
});
