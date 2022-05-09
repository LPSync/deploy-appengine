import {Box, makeStyles} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, {memo} from "react";

const useStyles = makeStyles(theme => ({
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const TaskAlert = ({isSubmitted}) => {
  const classes = useStyles();

  return (
    <Box>
      {isSubmitted && (
        <Box className={classes.alert} my={1}>
          <Alert severity="success">Task Updated</Alert>
        </Box>
      )}
    </Box>
  );
};

export default memo(TaskAlert);