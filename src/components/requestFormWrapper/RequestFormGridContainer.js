import React, { memo } from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const RequestFormGridContainer = ({...props}) => {
  const classes = useStyles();
  return <Grid container spacing={3} className={classes.gridContainer} {...props}/>
}

export default memo(RequestFormGridContainer);