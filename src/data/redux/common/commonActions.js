import CommonActionTypes from "./commonActionTypes";

export const setOrgChartEmail = (orgChartEmail) => ({
  type: CommonActionTypes.SET_ORGCHART_EMAIL,
  payload: { orgChartEmail },
});

export const enqueueSnackbar = (notification) => {
  const key = notification?.options?.key;

  return {
    type: CommonActionTypes.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = key => ({
  type: CommonActionTypes.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = key => ({
  type: CommonActionTypes.REMOVE_SNACKBAR,
  key,
});

export const setSearchQuery = (searchQuery) => ({
  type: CommonActionTypes.SET_SEARCH_QUERY,
  payload: { searchQuery },
});