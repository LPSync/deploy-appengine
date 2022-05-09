import React, {memo} from "react";
import {makeStyles, CircularProgress} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  tableCircularProgress: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "999",
  },
}));

const TableCircularProgress = () => {
  const classes = useStyles();
  return (
    <div className={classes.tableCircularProgress}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default memo(TableCircularProgress);
