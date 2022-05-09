import React, {memo} from "react";
import {makeStyles, Typography} from "@material-ui/core";
import TaskStatusBlock from "../taskManager/TaskStatusBlock";
import TaskStatuses from "../../data/constants/TaskStatuses";

const useStyles = makeStyles(() => ({
  taskStatusDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  smallText: {
    fontSize: ".8rem"
  },
}));

const ReqStatusRowField = ({req}) => {
  const classes = useStyles();

  return (
    <div className={classes.taskStatusDiv}>
      <TaskStatusBlock
        taskStatus={req.taskStatus}
        id={req.id}
        small
      />
      <Typography
        component={"div"}
        className={classes.smallText}
      >
        {req?.taskStatus ===
        TaskStatuses.COMPLETE &&
        !req?.requisitionTask?.reqFulfilled &&
        "unfilled"}
        {req?.taskStatus ===
        TaskStatuses.PENDING &&
        "Finance Approval"}
      </Typography>
    </div>
  );
};

export default memo(ReqStatusRowField);
