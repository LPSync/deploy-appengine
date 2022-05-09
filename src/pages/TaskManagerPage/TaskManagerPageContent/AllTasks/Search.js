import React, {memo} from "react";
import {TextField, makeStyles} from "@material-ui/core";
import {DebounceInput} from "react-debounce-input";

const useStyles = makeStyles((theme) => ({
  searchTextField: {
    width: "40ch",
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const Search = ({searchQuery, onSearch}) => {
  const classes = useStyles();

  return (
    <DebounceInput
      className={classes.searchTextField}
      id="outlined-basic"
      label="Search All Tasks"
      color="secondary"
      variant="outlined"
      margin="dense"
      minLength={0}
      debounceTimeout={300}
      value={searchQuery}
      onChange={(event) => onSearch && onSearch(event.target.value)}
      element={TextField}
    />
  );
};

export default memo(Search);
