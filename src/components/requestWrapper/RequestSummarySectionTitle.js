import React, { memo } from "react";
import {makeStyles, Typography } from "@material-ui/core";
import GridItem from "./GridItem";

const useStyles = makeStyles(() => ({
  sectionTitle: {
    fontWeight: 600,
  },
}));

const RequestSummarySection = ({title}) => {
  const classes = useStyles();

  return (
    <GridItem xs={12}>
      <Typography component={"div"} className={classes.sectionTitle}>
        {title}
      </Typography>
    </GridItem>
  );
};

export default memo(RequestSummarySection);