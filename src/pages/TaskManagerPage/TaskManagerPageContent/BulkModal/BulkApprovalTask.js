import React, { createRef, memo } from "react";
import { Box, Grid, makeStyles, Tooltip } from "@material-ui/core";
import BulkApprovalTaskTopBar from "./BulkApprovalTaskTopBar";
import BulkApprovalTaskMainSection from "./BulkApprovalTaskMainSection";
import BulkApprovalTaskCommentSection from "./BulkApprovalTaskCommentSection";

const useStyles = makeStyles(theme => ({
  bulkApprovalTask: {
    boxShadow: theme.shadows[5],
    margin: theme.spacing(1, 1, 2),
  },
  taskSectionsContainer: {
    "& :last-child": {
      borderRight: "none",
    },
  },
}));

const BulkApprovalTask = ({ task, selected, setSelected }) => {
  const classes = useStyles();
  const ref = createRef();

  const toggleSelect = () => {
    setSelected(taskIds => taskIds?.includes(task.id)
      ? taskIds?.filter(id => id !== task.id)
      : [...taskIds, task.id]);
  };

  return (
    <Box className={classes.bulkApprovalTask}>
      {(task?.disabled && task?.hoverText) ? (
          <Tooltip title={task?.disabled && task?.hoverText}>
            <BulkApprovalTaskTopBar ref={ref} task={task} selected={selected} toggleSelect={toggleSelect} />
          </Tooltip>
        )
        : <BulkApprovalTaskTopBar task={task} selected={selected} toggleSelect={toggleSelect} />
      }

      <Box p={2}>
        <Grid container className={classes.taskSectionsContainer}>
          {task?.sections?.map((section, index) => (
            <BulkApprovalTaskMainSection key={index} {...section} />
          ))}
        </Grid>

        <BulkApprovalTaskCommentSection commentSection={task?.commentSection} />
      </Box>
    </Box>
  );
};

export default memo(BulkApprovalTask);