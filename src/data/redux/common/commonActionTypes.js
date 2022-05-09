import {typesWithPrefix} from "../../helper/helpers";

const CommonActionTypes = {
  SET_ORGCHART_EMAIL: "SET_ORGCHART_EMAIL",
  ENQUEUE_SNACKBAR: "ENQUEUE_SNACKBAR",
  REMOVE_SNACKBAR: "REMOVE_SNACKBAR",
  CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
  SET_SEARCH_QUERY: "SET_SEARCH_QUERY"
};

export default typesWithPrefix("COMMON_")(CommonActionTypes);
