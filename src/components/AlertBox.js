import React, {memo} from "react";
import Alert from "@material-ui/lab/Alert";
import {makeStyles, Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertBox = ({severity, message, ...props}) => {
  const classes = useStyles();

  return (
    <Box className={classes.alert}>
      <Alert severity={severity} {...props}>
        {message}
      </Alert>
    </Box>
  );
};

export default memo(AlertBox);
