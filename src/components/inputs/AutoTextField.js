import React, {memo} from "react";
import {makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  filter: {
    margin: theme.spacing(1),
    width: "25ch",
    "& .MuiFilledInput-root": {
      background: theme.palette.primary.main,
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      transform: "translate(12px, 7px) scale(0.75)",
    },
    "& .MuiInputLabel-filled": {
      transform: "translate(12px, 17px) scale(1)",
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"] .MuiAutocomplete-input': {
      padding: "6px 4px"
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"]': {
      paddingTop: 17
    }
  },
}));

const AutoTextField =({...props}) => {
  const classes = useStyles();
  return <TextField
    size="small"
    color="secondary"
    variant={"filled"}
    className={classes.filter}
    {...props}
  />
};

export default memo(AutoTextField);