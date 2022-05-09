import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Button,
  Box,
} from "@material-ui/core";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import FrontendRoutes, {
  AdminRoutes,
} from "../../../data/constants/FrontendRoutes";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  active: {
    backgroundColor: theme.palette.primary.light,
  },
  subText: {
    paddingLeft: theme.spacing(2),
  },
  listItemText: {
    fontSize: ".9rem",
  },
}));

const AdminNavItems = () => {
  const classes = useStyles();

  const {
    permSysMgmtSettingsOffboarding,
    permSysMgmtSettingsOnboarding,
    permSysMgmtLogs,
    permSysMgmtManage,
    permSysMgmtBadgeMgmt,
    permSysMgmtCandidatePortalAccess,
    permSysMgmtSchedulerJobs,
    permSysMgmtFteCandidateTracker,
  } = useContext(AuthUserContext);

  return (
    <>
      <Box ml={1} mb={3}>
        <Button variant="outlined" href={FrontendRoutes.HOME}>
          lpsync home
        </Button>
      </Box>

      <ListSubheader>ADMIN TOOLS</ListSubheader>
      <List>
        {permSysMgmtCandidatePortalAccess && (//todo add new permission
          <ListItem
            button
            component={NavLink}
            to={AdminRoutes.ADMIN_CANDIDATE_PORTAL}
            activeClassName={classes.active}
          >
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Candidate Portal Settings"
            />
          </ListItem>
        )}
        {permSysMgmtFteCandidateTracker && (
          <ListItem
            button
            component={NavLink}
            to={AdminRoutes.ADMIN_FTE_CANDIDATE_TRACKER}
            activeClassName={classes.active}
          >
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="FTE Candidate Tracker"
            />
          </ListItem>
        )}
        {permSysMgmtSettingsOffboarding && (
          <ListItem
            button
            component={NavLink}
            to={AdminRoutes.ADMIN_OFFBOARDING_SETTINGS}
            activeClassName={classes.active}
          >
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Offboarding Settings"
            />
          </ListItem>
        )}
        {permSysMgmtSettingsOnboarding && (
          <ListItem
            button
            component={NavLink}
            to={AdminRoutes.ADMIN_ONBOARDING_SETTINGS}
            activeClassName={classes.active}
          >
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Onboarding Settings"
            />
          </ListItem>
        )}
        {permSysMgmtSchedulerJobs && (
          <ListItem
            button
            component={NavLink}
            to={AdminRoutes.ADMIN_SCHEDULER_JOBS}
            activeClassName={classes.active}
          >
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Scheduler Jobs"
            />
          </ListItem>
        )}
        {permSysMgmtLogs && (
          <ListItem
            button
            component={NavLink}
            to={AdminRoutes.ADMIN_SYSTEM_LOGS}
            activeClassName={classes.active}
          >
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="System Logs"
            />
          </ListItem>
        )}
        {permSysMgmtBadgeMgmt && (
          <ListItem
            button
            component={NavLink}
            to={AdminRoutes.ADMIN_USER_BADGING_MANAGEMENT}
            activeClassName={classes.active}
          >
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="User Badge Management"
            />
          </ListItem>
        )}
        {permSysMgmtManage && (
          <ListItem
            button
            component={NavLink}
            to={AdminRoutes.ADMIN_USER_MANAGEMENT}
            activeClassName={classes.active}
          >
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="User Management"
            />
          </ListItem>
        )}
      </List>
    </>
  );
};

export default AdminNavItems;
