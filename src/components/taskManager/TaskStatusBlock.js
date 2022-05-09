import React, {memo} from "react";
import {makeStyles} from "@material-ui/core";
import TaskStatuses, {
  getTaskStatusText,
} from "../../data/constants/TaskStatuses";
import FteTrackerStatuses from "../../data/constants/FteTrackerStatuses";
import {TierStatuses} from "../../data/constants/ServiceAndSystemDirectory";

const useStyles = makeStyles((theme) => ({
  statusField: {
    display: "flex",
    justifyContent: "center",
    borderRadius: "5px",
    fontWeight: 600,
    backgroundColor: theme.palette.primary.light,
    fontSize: (props) => (props.small ? ".8rem" : "1rem"),
    lineHeight: 1.5,
  },
  statusFailed: {
    width: "8ch",
    color: "#ca2929",
  },
  statusCancelled: {
    width: (props) => (props.small ? "11ch" : "12ch"),
    color: "#363944",
  },
  statusComplete: {
    width: (props) => (props.small ? "10ch" : "11ch"),
    color: "#2e7d32",
  },
  statusPending: {
    width: "20ch",
    color: "#df60a2",
  },
  statusSigning: {
    width: (props) => (props.small ? "20ch" : "21ch"),
    color: "#00838f",
  },
  statusReady: {
    width: (props) => (props.small ? "11ch" : "12ch"),
    color: "#6a1b9a",
  },
  statusRunning: {
    width: "18ch",
    color: "#FA772E",
  },
  statusExpired: {
    width: "10ch",
    color: "#5d4037",
  },
  tierOne: {
    color: "#ca2929",
    width: "10ch",
  },
  tierTwo: {
    color: "#ff6900",
    width: "10ch",
  },
  tierThree: {
    color: "#2e7d32",
    width: "10ch",
  },
  tierFour: {
    color: "#2ba8d5",
    width: "10ch",
  },
}));

const getTaskStatusClass = (taskStatus, classes) => {
  switch (taskStatus) {
    case TaskStatuses.PENDING:
      return classes.statusPending;
    case TaskStatuses.PENDING_USER_TASKS:
      return classes.statusSigning;
    case TaskStatuses.READY:
      return classes.statusReady;
    case TaskStatuses.RUNNING:
      return classes.statusRunning;
    case TaskStatuses.COMPLETE:
      return classes.statusComplete;
    case TaskStatuses.CANCELLED:
      return classes.statusCancelled;
    case TaskStatuses.FAILED:
      return classes.statusFailed;
    case TaskStatuses.EXPIRED:
      return classes.statusExpired;
    case FteTrackerStatuses.NEW:
      return classes.statusComplete;
    case FteTrackerStatuses.DISPATCH_NOW:
      return classes.statusPending;
    case FteTrackerStatuses.SHIPPED:
      return classes.statusReady;
    case TierStatuses.One:
      return classes.tierOne;
    case TierStatuses.Two:
      return classes.tierTwo;
    case TierStatuses.Three:
      return classes.tierThree;
    case TierStatuses.Four:
      return classes.tierFour;

    default:
      return "";
  }
};

const TaskStatusBlock = ({taskStatus, id, small}) => {
  const classes = useStyles({small});
  const statusTextClass = getTaskStatusClass(taskStatus, classes);

  return (
    <div key={id} className={`${classes.statusField} ${statusTextClass}`}>
      {getTaskStatusText(taskStatus).toUpperCase()}
    </div>
  );
};

export default memo(TaskStatusBlock);
