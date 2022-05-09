import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {useLocation, useRouteMatch} from "react-router-dom";

import {Box, Drawer, Hidden, List, makeStyles} from "@material-ui/core";
import NavItems from "./NavItems";
import {AdminRoutes} from "../../../data/constants/FrontendRoutes";
import AdminNavItems from "./AdminNavItems";

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 295,
  },
  desktopDrawer: {
    backgroundColor: "transparent",
    width: 295,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({onMobileClose, openMobile}) => {
  const classes = useStyles();
  const location = useLocation();
  const isAdmin = useRouteMatch(AdminRoutes.ADMIN);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]); // fixme add openMobile && onMobileClose, resolve bahavior in bodyLayout with closing after

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box p={2}>
        <List>{isAdmin ? <AdminNavItems /> : <NavItems />}</List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{paper: classes.mobileDrawer}}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{paper: classes.desktopDrawer, docked: classes.mobileDrawer}}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
