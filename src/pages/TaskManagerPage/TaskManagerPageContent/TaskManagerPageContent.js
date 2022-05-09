import React, {memo, useContext, useEffect, useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {AppBar, Box, makeStyles, Paper, Tabs} from "@material-ui/core";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import MyTasks from "./MyTasks";
import AllTasks from "./AllTasks";
import AllOffboardingTasks from "./AllOffboardingTasks";
import PendingApprovalTasks from "./PendingApprovalTasks";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import CustomTabPanel, {
  a11yProps,
} from "../../../components/tabs/CustomTabPanel";
import AllRequisitionTasks from "./AllRequisitionTasks";
import SelectedTaskContent from "../SelectedTaskContent";
import TaskAlert from "../SelectedTasks/components/TaskAlert";
import StyledTab from "../../../components/tabs/StyledTab";
import AllOnboardingTasks from "./AllOnboardingTasks";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundImage: theme.palette.background.gradient,
  },
}));

const tabName = "scrollable-auto";

const TaskManagerContent = () => {
  const classes = useStyles();
  let history = useHistory();
  let match = useRouteMatch(FrontendRoutes.TASK_MANAGER_VIEW());
  const {
    permTaskManagerViewAll,
    permTaskManagerViewAllOffboarding,
    permTaskManagerViewAllOnboarding,
    permTaskManagerViewAllRequisition,
    permTaskManagerViewTeam,
    permOnboardingApproveTasks,
    permOffboardingApproveTasks,
    permRequisitionApproveTasks,
  } = useContext(AuthUserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [value, setValue] = useState(0);
  const [pendingApprovalIndex, setPendingApprovalIndex] = useState();
  const [viewAllTasksTab, setViewAllTasksTab] = useState(false);
  const [viewPendingTasksTab, setViewPendingTasksTab] = useState(false);
  const [allTasksIndex, setAllTasksIndex] = useState(0);

  useEffect(() => {
    const taskView = match ? match.params.hash : null;
    if (taskView) {
      if (viewAllTasksTab || permTaskManagerViewTeam) {
        if (taskView === "mytasks") {
          setValue(0);
        } else if (taskView === "pendingapproval") {
          setValue(pendingApprovalIndex);
        } else if (taskView === "alltasks" && viewAllTasksTab) {
          setValue(allTasksIndex);
        }
      }
    }
  }, [
    match,
    allTasksIndex,
    pendingApprovalIndex,
    viewAllTasksTab,
    permTaskManagerViewTeam,
  ]);

  useEffect(() => {
    if (
      permTaskManagerViewAll ||
      permTaskManagerViewAllOffboarding ||
      permTaskManagerViewAllOnboarding ||
      permTaskManagerViewAllRequisition
    ) {
      setViewAllTasksTab(true);
      setAllTasksIndex(1);
      setPendingApprovalIndex(2);
    } else {
      setAllTasksIndex(2);
      setPendingApprovalIndex(1);
    }
  }, [
    permTaskManagerViewAll,
    permTaskManagerViewAllOffboarding,
    permTaskManagerViewAllOnboarding,
    permTaskManagerViewAllRequisition,
  ]);

  useEffect(() => {
    if (
      permOnboardingApproveTasks ||
      permOffboardingApproveTasks ||
      permRequisitionApproveTasks
    ) {
      setViewPendingTasksTab(true);
    }
  }, [
    permOnboardingApproveTasks,
    permOffboardingApproveTasks,
    permRequisitionApproveTasks,
  ]);

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);

    let taskView;
    if (newValue === 0) {
      taskView = "mytasks";
    } else if (newValue === allTasksIndex) {
      taskView = "alltasks";
    } else if (newValue === pendingApprovalIndex) {
      taskView = "pendingapproval";
    }
    history.push(FrontendRoutes.TASK_MANAGER_VIEW(taskView));
  };

  return (
    <Box mt={3} minWidth={1050}>
      <Box>
        <TaskAlert isSubmitted={isSubmitted} />

        <Box minWidth={1050} pb={1}>
          <Paper elevation={3}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleTabsChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="task manager tabs navigation"
                className={classes.paper}
              >
                <StyledTab label="My Tasks" {...a11yProps(tabName, 0)} />
                {viewAllTasksTab && (
                  <StyledTab
                    label="All Tasks"
                    {...a11yProps(tabName, allTasksIndex)}
                  />
                )}
                {viewPendingTasksTab && (
                  <StyledTab
                    label="Pending Approval"
                    {...a11yProps(tabName, pendingApprovalIndex)}
                  />
                )}
              </Tabs>
            </AppBar>

            <CustomTabPanel value={value} index={0} name={tabName}>
              <Box>
                <MyTasks />
              </Box>
            </CustomTabPanel>

            {viewAllTasksTab && (
              <CustomTabPanel
                value={value}
                index={allTasksIndex}
                name={tabName}
              >
                <Box>
                  {permTaskManagerViewAll && <AllTasks />}
                  {permTaskManagerViewAllOffboarding &&
                    !permTaskManagerViewAll && <AllOffboardingTasks />}
                  {permTaskManagerViewAllRequisition &&
                    !permTaskManagerViewAll && <AllRequisitionTasks />}
                  {permTaskManagerViewAllOnboarding &&
                    !permTaskManagerViewAll && <AllOnboardingTasks />}
                </Box>
              </CustomTabPanel>
            )}
            {viewPendingTasksTab && (
              <CustomTabPanel
                value={value}
                index={pendingApprovalIndex}
                name={tabName}
              >
                <Box>
                  <PendingApprovalTasks />
                </Box>
              </CustomTabPanel>
            )}
          </Paper>
        </Box>

        <SelectedTaskContent setIsSubmitted={setIsSubmitted} />
      </Box>
    </Box>
  );
};

export default memo(TaskManagerContent);
