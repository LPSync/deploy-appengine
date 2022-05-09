import React, {useContext} from "react";
import {Box, Button, Drawer, makeStyles, Toolbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {UserManagementContext} from "./UserManagementContextProvider";

const useStyles = makeStyles(() => ({
  paper: {
    width: "700px",
    display: "flex",
    flexDirection: "column",
  },
  closeToolbar: {flexShrink: 0},
  footerDiv: {height: "3rem", flexShrink: 0},
  btnDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const DrawerComponent = ({children}) => {
  const classes = useStyles();
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    setIsViewDetailsContent,
    setIsEditRoleContent,
  } = useContext(UserManagementContext);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    setIsViewDetailsContent(false);
    setIsEditRoleContent(false);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        classes={{paper: classes.paper}}
      >
        <Toolbar className={classes.closeToolbar}>
          <Box className={classes.btnDiv}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleClose()}
            >
              <CloseIcon /> Close
            </Button>
          </Box>
        </Toolbar>
        {children}
        <div className={classes.footerDiv} />
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
