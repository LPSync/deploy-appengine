import React, {forwardRef, memo} from "react";
import {Box, Button, makeStyles} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  approveBtn: {
    marginRight: theme.spacing(2),
  },
  rejectBtn: {
    marginRight: theme.spacing(2),
  },
  btnDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  cancelBtn: {
    marginTop: theme.spacing(3),
  },
  disabled: {
    "&.Mui-disabled": {
      pointerEvents: "auto",
    },
  },
}));

export const CancelButton = ({handleClick}) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      size="small"
      onClick={handleClick}
      className={classes.cancelBtn}
    >
      Cancel Task
    </Button>
  );
};
export const SubmitApprovalButton = ({handleSubmit}) => {
  const classes = useStyles();
  return (
    <Box m={2} className={classes.btnDiv}>
      <Button size="small" variant="contained" onClick={handleSubmit}>
        Submit Approval
      </Button>
    </Box>
  );
};

export const TaskRejectButton = ({isRejected, ...props}) => {
  const classes = useStyles();
  return (
    <TaskActionButton
      isAction={isRejected}
      className={classes.rejectBtn}
      {...props}
    >
      <HighlightOffIcon />
      Reject Task
    </TaskActionButton>
  );
};

export const TaskCancelButton = ({isCancelled, ...props}) => {
  return (
    <TaskActionButton isAction={isCancelled} {...props}>
      <HighlightOffIcon />
      Cancel Task
    </TaskActionButton>
  );
};

export const TaskActionButton = forwardRef(
  ({handleClick, isAction, children, ...props}, ref) => {
    return (
      <Button
        size="small"
        color="secondary"
        variant={isAction ? "contained" : "outlined"}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

export const TaskApproveButton = forwardRef(({isApproved, ...props}, ref) => {
  const classes = useStyles();

  return (
    <TaskActionButton
      ref={ref}
      isAction={isApproved}
      className={classes.approveBtn}
      classes={{root: classes.disabled}}
      {...props}
    >
      <CheckCircleOutlineIcon />
      Approve Task
    </TaskActionButton>
  );
});

export default {
  SubmitApprovalButton: memo(SubmitApprovalButton),
  CancelButton: memo(CancelButton),
};
