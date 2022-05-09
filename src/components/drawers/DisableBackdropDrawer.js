import React, {memo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Drawer} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  paper: {
    width: "700px",
    display: "flex",
    flexDirection: "column",
  },
}));

const DisableBackdropDrawer = ({open, onClose, children}) => {
  const classes = useStyles();

  return (
    <Drawer
      disableBackdropClick
      anchor="right"
      open={open}
      onClose={onClose}
      classes={{paper: classes.paper}}
    >
      {children}
    </Drawer>
  );
};

export default memo(DisableBackdropDrawer);
