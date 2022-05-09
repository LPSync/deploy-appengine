import React, { memo } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import RequestSummarySectionTitle from "./RequestSummarySectionTitle";

const useStyles = makeStyles((theme) => ({
  gridItemContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const RequestSummarySection = ({title, children}) => {
  const classes = useStyles();

  return (
    <Grid item container spacing={1} className={classes.gridItemContainer}>
      <RequestSummarySectionTitle title={title}/>

      {children}
    </Grid>
  );
};

export default memo(RequestSummarySection);