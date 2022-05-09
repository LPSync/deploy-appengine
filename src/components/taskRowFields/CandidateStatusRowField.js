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

const CandidateStatusRowField = ({candidate}) => {
  const classes = useStyles();

  return (
    <div className={classes.taskStatusDiv}>
      <TaskStatusBlock
        taskStatus={candidate?.taskStatus}
        id={candidate?.id}
        small
      />
      <Typography
        component={"div"}
        className={classes.smallText}
      >
        {candidate?.taskStatus ===
        TaskStatuses.PENDING && "HR/IT approval"}
      </Typography>
    </div>
  );
};

export default memo(CandidateStatusRowField);
