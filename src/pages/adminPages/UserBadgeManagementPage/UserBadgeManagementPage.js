import React, {memo, useContext, useState} from "react";
import {Box, makeStyles, Paper, Tab} from "@material-ui/core";
import Page from "../../../components/Page";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../../components/NoPermissionsError";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import CustomTabPanel, {
  a11yProps,
} from "../../../components/tabs/CustomTabPanel";
import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import CustomTabs from "../../../components/tabs/CustomTabs";
import PageTitleBox from "../../../components/blocks/PageTitleBox";
import ManageBadgesTable from "./ManageBadges/ManageBadgesTable";
import BadgeTypes from "../../../data/constants/BadgeTypes";
import BadgesAutomationTable from "./BadgesAutomation/BadgesAutomationTable";
import SplashScreenSettings from "./SplashScreenSettings/SplashScreenSettings";

const useStyles = makeStyles((theme) => ({
  tabRoot: {
    flexGrow: 1,
    display: "flex",
    height: "70vh",
  },
  div: {
    padding: theme.spacing(2),
  },
}));

const tabName = "vertical";

const UserBadgeManagementPage = () => {
  const classes = useStyles();
  const {permSysMgmtBadgeMgmt} = useContext(AuthUserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="User Badge Management | LPSYNC">
      <BreadcrumbHomeBox admin>
        <BreadcrumbText title={"USER BADGE MANAGEMENT"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="User Badge Management" />

        {permSysMgmtBadgeMgmt ? (
          <Box mt={3} minWidth={1050}>
            <Paper elevation={3}>
              <div className={classes.tabRoot}>
                <CustomTabs value={value} onChange={handleChange}>
                  <Tab label="System Owner Badges" {...a11yProps(tabName, 0)} />
                  <Tab
                    label="Hobbies/Interests Badges"
                    {...a11yProps(tabName, 1)}
                  />
                  <Tab
                    label="Subject Matter Expert Badges"
                    {...a11yProps(tabName, 2)}
                  />
                  <Tab label="Badges Automation" {...a11yProps(tabName, 2)} />
                  <Tab label="Splash Screen" {...a11yProps(tabName, 3)} />
                </CustomTabs>

                <CustomTabPanel value={value} index={0} name={tabName}>
                  <div className={classes.div}>
                    <ManageBadgesTable
                      badgeTypeTitle={"System Owner"}
                      badgeType={BadgeTypes.SYSTEM_OWNER}
                    />
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1} name={tabName}>
                  <div className={classes.div}>
                    <ManageBadgesTable
                      badgeTypeTitle={"Hobbies/Interests"}
                      badgeType={BadgeTypes.HOBBIES_INTERESTS}
                    />
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2} name={tabName}>
                  <div className={classes.div}>
                    <ManageBadgesTable
                      badgeTypeTitle={"Subject Matter Expert"}
                      badgeType={BadgeTypes.SUBJECT_MATTER_EXPERT}
                    />
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3} name={tabName}>
                  <div className={classes.div}>
                    <BadgesAutomationTable />
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4} name={tabName}>
                  <div className={classes.div}>
                    <SplashScreenSettings />
                  </div>
                </CustomTabPanel>
              </div>
            </Paper>
          </Box>
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default memo(UserBadgeManagementPage);
