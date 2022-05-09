import { OrderedMap } from "immutable";
import CommonActionTypes from "./commonActionTypes";

const defaultState = OrderedMap({
  orgChartEmail: "",
  notifications: [],
  searchQuery: ""
});

const commonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CommonActionTypes.SET_ORGCHART_EMAIL:
      return state.set("orgChartEmail", action.payload.orgChartEmail);
    case  CommonActionTypes.ENQUEUE_SNACKBAR:
      return state.update("notifications", notifications =>
        [...notifications, { key: action.key, ...action.notification}]
      );

    case  CommonActionTypes.CLOSE_SNACKBAR:
      return state.update("notifications", notifications => notifications.map(
        notification => ((action.dismissAll || notification.key === action.key)
          ? { ...notification, dismissed: true }
          : { ...notification }))
      );

    case  CommonActionTypes.REMOVE_SNACKBAR:
      return  state.update("notifications", notifications => notifications.filter(
          notification => notification.key !== action.key)
      );

    case CommonActionTypes.SET_SEARCH_QUERY: {
      return  state.set("searchQuery", action.payload.searchQuery);
    }
    default:
      return state;
  }
};

export default commonReducer;
