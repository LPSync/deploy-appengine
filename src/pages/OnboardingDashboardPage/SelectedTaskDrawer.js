import React, {memo} from "react";
import {Drawer, makeStyles} from "@material-ui/core";
import TaskTypes from "../../data/constants/TaskTypes";
import SelectedCandidateTaskContent from "./SelectedTaskContent/SelectedCandidateTaskContent";
import SelectedRequisitionTaskContent from "./SelectedTaskContent/SelectedRequisitionTaskContent";
import {connect} from "react-redux";
import {
  setIsCandidateSubmitted,
  setIsDrawerOpen,
  setIsReqSubmitted,
  setSelectedTaskData,
} from "../../data/redux/onboardingDashboard/onboardingDashboardActions";

const useStyles = makeStyles(() => ({
  paper: {
    width: "700px",
    display: "flex",
    flexDirection: "column",
  },
}));

const SelectedTaskDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  setSelectedTaskData,
  viewTaskTypeDetails,
  setIsReqSubmitted,
  setIsCandidateSubmitted,
  setIsSubmitted,
}) => {
  const classes = useStyles();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (!open) {
      setSelectedTaskData();
    }
    setIsDrawerOpen(open);
  };

  const onSubmitted = (type) => {
    setIsSubmitted(true);
    if (type === "req") {
      setIsReqSubmitted(true);
    }
    if (type === "candidate") {
      setIsCandidateSubmitted(true);
    }
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
      {viewTaskTypeDetails === TaskTypes.ONBOARDING ? (
        <SelectedCandidateTaskContent onSubmitted={onSubmitted} />
      ) : viewTaskTypeDetails === TaskTypes.REQUISITION ? (
        <SelectedRequisitionTaskContent onSubmitted={onSubmitted} />
      ) : (
        <></>
      )}
    </Drawer>
  );
};

export default connect(
  (state) => ({
    isDrawerOpen: state.onboardingDashboard.get("isDrawerOpen"),
    viewTaskTypeDetails: state.onboardingDashboard.get("viewTaskTypeDetails"),
  }),
  {
    setIsDrawerOpen,
    setSelectedTaskData,
    setIsReqSubmitted,
    setIsCandidateSubmitted,
  }
)(memo(SelectedTaskDrawer));
