import React, {memo} from "react";
import {Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {borderRight: "1px solid " + theme.palette.background.dark},
}));

const BottomSectionWrapper = ({children, ...props}) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.grid} {...props}>
      {children}
    </Grid>
  );
};

export default memo(BottomSectionWrapper);
