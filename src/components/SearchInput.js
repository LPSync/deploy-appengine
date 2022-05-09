import React from "react";
import {makeStyles, TextField} from "@material-ui/core";
import {DebounceInput} from "react-debounce-input";

const useStyles = makeStyles((theme) => ({
  searchTextField: {
    width: "40ch",
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    "& .MuiFilledInput-root": {
      background: theme.palette.primary.main,
    },
  },
}));

const SearchInput = ({searchQuery, onSearch, label, helperText}) => {
  const classes = useStyles();
  return (
    <DebounceInput
      className={classes.searchTextField}
      id="outlined-basic"
      label={label}
      variant="outlined"
      color="secondary"
      margin="dense"
      minLength={0}
      debounceTimeout={300}
      autoComplete="off"
      value={searchQuery}
      helperText={helperText}
      onChange={(event) => onSearch && onSearch(event.target.value)}
      element={TextField}
    />
  );
};

export default SearchInput;
