import React, {memo} from "react";
import TaskCloseButtonToolbar from "../../../../components/taskManager/TaskCloseButtonToolbar";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  box: {overflowY: "auto"},
  footerDiv: {height: "3rem", flexShrink: 0}
}));

const SelectedTaskWrapper = ({isLoading, id, handleClose, withFooter, preChildren, children}) => {
  const classes = useStyles();

  return (
    <>
      <TaskCloseButtonToolbar handleClose={handleClose} />
      {isLoading ? (
        <LoadingCircle text={"Loading task details..."} />
      ) : (
        <>
          {preChildren}
          <Box className={classes.box} key={id} id="selected-task-window">
            {children}
          </Box>
        </>
      )}
      {withFooter && <div className={classes.footerDiv} />}
    </>
  );
};

export default memo(SelectedTaskWrapper);