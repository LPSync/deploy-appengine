import React, {memo} from "react";
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.25rem",
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const TopTypography = ({...props}) => {
  const classes = useStyles();

  return <Typography className={classes.title} component="h3" {...props} />;
};

export default memo(TopTypography);
