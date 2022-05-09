import {useCallback} from "react";
import {debounce} from "@mui/material";
import {removeExtraSpaces} from "../data/helper/commonFunctions";

const useDebouncedChangeHandler = (callback, dispatch) => {
  return useCallback(
    debounce(query => {
      const trimmedQuery = removeExtraSpaces(query);

      return dispatch ? dispatch(callback(trimmedQuery)) : callback(trimmedQuery);
    }, 400),
    [callback, dispatch]);
};

export default useDebouncedChangeHandler;