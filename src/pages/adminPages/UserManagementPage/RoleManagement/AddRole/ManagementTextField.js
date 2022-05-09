import React, {memo, useCallback} from "react";
import {makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  textField: {
    width: "40ch",
  },
}));

const ManagementTextField = ({onChange, onValueChange, ...props}) => {
  const classes = useStyles();

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
      onValueChange && onValueChange(e.target.value);
    },
    [onChange, onValueChange]
  );

  return (
    <TextField
      required
      color="secondary"
      variant="outlined"
      margin="dense"
      autoComplete="off"
      onChange={handleChange}
      className={classes.textField}
      {...props}
    />
  )
}

export default memo(ManagementTextField);