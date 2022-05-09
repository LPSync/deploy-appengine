import React, { forwardRef, memo } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import CustomCheckbox from "../../../../components/checkboxes/CustomCheckbox";

const useStyles = makeStyles(theme => ({
  topBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(0.5, 1.5, 0.5, 0.5),
  },
  topTaskInfoBox: {
    display: "flex",
    alignItems: "center",
  },
  topBoxTypography: {
    fontSize: "1rem",
  },
}));

const BulkApprovalTaskTopBar = forwardRef(
  ({ task, selected, toggleSelect, ...props }, ref) => {
    const { id, taskType, requestedDate, requestedBy, disabled } = task || {};
    const classes = useStyles();
    return (
      <div ref={ref} {...props}>
        <Box className={classes.topBox}>
          <Box className={classes.topTaskInfoBox}>
            <CustomCheckbox
              disabled={disabled}
              checked={selected}
              onChange={toggleSelect}
            />
            <Typography className={classes.topBoxTypography} style={{ textTransform: "capitalize" }}>
              <strong> {taskType} task </strong>
              {id}
            </Typography>
          </Box>

          <Typography className={classes.topBoxTypography}>
            <strong>Requested on: </strong>
            {requestedDate}
            <strong> By: </strong>
            {requestedBy}
          </Typography>
        </Box>
      </div>
    );
  },
);

export default memo(BulkApprovalTaskTopBar);