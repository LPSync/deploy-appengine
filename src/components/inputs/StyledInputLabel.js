import React, {memo} from "react";
import {InputLabel, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: theme.palette.text.primary,
    "&.Mui-focused": {
      color: theme.palette.text.primary,
    },
  },
}));

const StyledInputLabel = ({id, children}) => {
  const classes = useStyles();
  return (
    <InputLabel id={id} className={classes.inputLabel}>
      {children}
    </InputLabel>
  );
};

export default memo(StyledInputLabel);
