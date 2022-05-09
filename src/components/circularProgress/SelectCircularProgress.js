import React, {memo} from "react";
import {Box, CircularProgress, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  progressCircleBox: {
    display: "flex",
    alignContent: "flex-end",
  },
  progressCircle: {
    color: theme.palette.warning.main,
    marginRight: theme.spacing(2),
  },
}));

const SelectCircularProgress = () => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.progressCircleBox}>
      <CircularProgress size={24} className={classes.progressCircle} />
      <p> searching...</p>
    </Box>
  );
};

export default memo(SelectCircularProgress);
