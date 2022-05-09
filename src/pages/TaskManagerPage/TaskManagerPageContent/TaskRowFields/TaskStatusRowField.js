import React, {memo} from "react";
import TaskStatuses from "../../../../data/constants/TaskStatuses";
import TaskTypes from "../../../../data/constants/TaskTypes";
import {makeStyles, Tooltip} from "@material-ui/core";
import TaskStatusBlock from "../../../../components/taskManager/TaskStatusBlock";
import ApprovalStatuses from "../../../../data/constants/ApprovalStatuses";

const useStyles = makeStyles(() => ({
  taskStatusDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tinyFontSize: {
    fontSize: ".7rem",
  },
}));

const TaskStatusRowField = ({task}) => {
  const classes = useStyles();

  return (
    <div className={classes.taskStatusDiv}>
      {task.taskStatus === TaskStatuses.COMPLETE &&
      task.taskType === TaskTypes.ONBOARDING ? (
        <Tooltip title="IT accounts created. Credentials sent to users Non-LP email address.">
          <TaskStatusBlock taskStatus={task.taskStatus} small />
        </Tooltip>
      ) : (
        <TaskStatusBlock taskStatus={task.taskStatus} small />
      )}
      <div className={classes.tinyFontSize}>
        {task.taskStatus === TaskStatuses.PENDING &&
          !task.taskApprovalStatus &&
          (task.taskType === TaskTypes.REQUISITION
            ? "Finance approval"
            : task.taskType === TaskTypes.ONBOARDING ||
              task.taskType === TaskTypes.OFFBOARDING
            ? "HR/IT approval"
            : null)}

        {task.taskStatus === TaskStatuses.PENDING &&
          task.taskApprovalStatus === ApprovalStatuses.FIRST &&
          (task.taskType === TaskTypes.OFFBOARDING ? "2nd approval" : null)}
      </div>
    </div>
  );
};

export default memo(TaskStatusRowField);
