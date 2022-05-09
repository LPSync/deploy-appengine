import React, { memo } from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  taskSection: {
    padding: "16px 16px 8px",
    borderRight: "1px solid #ffffff",
  },
  titleSection: {
    display: "flex",
    alignItems: "center",
  },
  taskRowTypography: {
    // "&::first-line": {
    //   textIndent: 50,
    // }
  },
}));

const BulkApprovalTaskMainSection = ({ columnSize, title, icon, rows }) => {
  const classes = useStyles();
  return (
    <Grid item xs={columnSize} className={classes.taskSection}>
      <Box className={classes.titleSection}>
        {icon}
        <Typography variant="subtitle1" style={{ paddingLeft: 4 }}>
          <strong> {title}: </strong>
        </Typography>
      </Box>

      <Box pl={3.5}>
        {rows?.map(({ label, value }, index) => value && (
          <Typography key={index} variant="subtitle1" className={classes.taskRowTypography}>
            {label && label + ": "}
            {value}
          </Typography>
        ))}
      </Box>
    </Grid>
  );
};

export default memo(BulkApprovalTaskMainSection);