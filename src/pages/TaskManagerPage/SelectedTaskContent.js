import React, {memo, useEffect} from "react";
import TaskTypes from "../../data/constants/TaskTypes";
import {Drawer, makeStyles} from "@material-ui/core";
import SelectedOffboardTaskContent from "./SelectedOffboardTaskContent";
import SelectedOnboardTaskContent from "./SelectedOnboardTaskContent";
import SelectedRequisitionTaskContent from "./SelectedRequisitionTaskContent";
import {
  setIsDrawerOpen,
  setSelectedTaskData,
  setViewTaskTypeDetails,
} from "../../data/redux/taskManager/taskManagerActions";
import {connect} from "react-redux";
import {useHistory, useRouteMatch} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {GET_TASK} from "../../operations/queries/getTask";
import handleError from "../../data/handleError";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import SelectedTaskWrapper from "./SelectedTasks/components/SelectedTaskWrapper";
import SelectedBadgeRequestTaskContent from "./SelectedBadgeRequestTaskContent";

const useStyles = makeStyles(() => ({
  paper: {
    width: "700px",
    display: "flex",
    flexDirection: "column",
  },
}));

const SelectedTaskContent = ({
  setIsSubmitted,
  setSelectedTaskData,
  isDrawerOpen,
  setIsDrawerOpen,
  viewTaskTypeDetails,
  setViewTaskTypeDetails,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const {taskId, hash} =
    useRouteMatch(FrontendRoutes.TASK_MANAGER_VIEW_TASK())?.params || {};

  const [executeSearch, {data, loading}] = useLazyQuery(GET_TASK, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setSelectedTaskData(data.get_task);
      setViewTaskTypeDetails(data.get_task?.taskType);
    },
    onError: (error) => {
      setIsDrawerOpen(false);
      history.push(FrontendRoutes.TASK_MANAGER_VIEW(hash));
      handleError(error)(history);
    },
  });

  useEffect(() => {
    if (taskId) {
      if (!isNaN(parseInt(taskId))) {
        setIsDrawerOpen(true);
        executeSearch({variables: {search: taskId}});
      } else {
        history.push(FrontendRoutes.TASK_MANAGER_VIEW(hash));
      }
    }
  }, [taskId]);

  useEffect(() => {
    // on second opening the same task
    if (taskId && !isNaN(parseInt(taskId)) && data?.get_task?.id === taskId) {
      setSelectedTaskData(data.get_task);
    }
  }, [taskId, data]);

  const toggleDrawer = (open) => (event) => {
    if (
      event?.type === "keydown" &&
      (event?.key === "Tab" || event?.key === "Shift")
    ) {
      return;
    }
    if (!open) {
      history.push(FrontendRoutes.TASK_MANAGER_VIEW(hash));
      setSelectedTaskData();
    }
    setIsDrawerOpen(open);
  };

  const onSubmitted = () => {
    setIsSubmitted(true);
    resetSubmitted();
  };

  const resetSubmitted = () => {
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
      classes={{paper: classes.paper}}
    >
      <SelectedTaskWrapper
        id={taskId}
        handleClose={toggleDrawer(false)}
        isLoading={loading}
      >
        {viewTaskTypeDetails === TaskTypes.OFFBOARDING ? (
          <SelectedOffboardTaskContent
            onSubmitted={onSubmitted}
            handleClose={toggleDrawer(false)}
          />
        ) : viewTaskTypeDetails === TaskTypes.ONBOARDING ? (
          <SelectedOnboardTaskContent
            onSubmitted={onSubmitted}
            handleClose={toggleDrawer(false)}
          />
        ) : viewTaskTypeDetails === TaskTypes.REQUISITION ? (
          <SelectedRequisitionTaskContent
            onSubmitted={onSubmitted}
            handleClose={toggleDrawer(false)}
          />
        ) : viewTaskTypeDetails === TaskTypes.BADGE_REQUEST ? (
          <SelectedBadgeRequestTaskContent
            onSubmitted={onSubmitted}
            handleClose={toggleDrawer(false)}
          />
        ) : (
          <></>
        )}
      </SelectedTaskWrapper>
      <div />
    </Drawer>
  );
};

export default connect(
  (state) => ({
    isDrawerOpen: state.taskManager.get("isDrawerOpen"),
    viewTaskTypeDetails: state.taskManager.get("viewTaskTypeDetails"),
  }),
  {setIsDrawerOpen, setSelectedTaskData, setViewTaskTypeDetails}
)(memo(SelectedTaskContent));
