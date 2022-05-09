import React, {memo} from "react";
import {Drawer, makeStyles} from "@material-ui/core";
import TaskCloseButtonToolbar from "../taskManager/TaskCloseButtonToolbar";

const useStyles = makeStyles(() => ({
  paper: {
    width: "700px",
    display: "flex",
    flexDirection: "column",
  },
  footerDiv: {height: "3rem", flexShrink: 0},
}));

const StyledDrawer = ({children, isOpen, handleClose, handleDrawerClose}) => {
  const classes = useStyles();

  return (
    <div>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleDrawerClose || handleClose}
        classes={{paper: classes.paper}}
      >
        <TaskCloseButtonToolbar handleClose={handleClose}/>
        {children}
        <div className={classes.footerDiv} />
      </Drawer>
    </div>
  );
};

export default memo(StyledDrawer);
