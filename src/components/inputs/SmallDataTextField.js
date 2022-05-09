import React, {memo} from "react";
import {makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  dateTextField: {
    fontSize: "1rem",
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

const SmallDataTextField = ({...props}) => {
  const classes = useStyles();
  return (
    <form noValidate>
      <TextField
        size="small"
        type="date"
        className={classes.dateTextField}
        InputLabelProps={{
          shrink: true,
        }}
        {...props}
      />
    </form>
  )
};

export default memo(SmallDataTextField);