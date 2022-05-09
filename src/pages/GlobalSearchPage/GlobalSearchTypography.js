import React, { memo } from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: "0.875em",
    lineHeight: 1.5
  },
  title: {
    fontSize: "1em",
    lineHeight: 2,
    fontWeight: "bold",
  },
}));

const GlobalSearchTypography = ({title, ...props}) => {
  const classes = useStyles();
  return <Typography color="textPrimary" className={title ? classes.title : classes.text} {...props}/>
}

export default memo(GlobalSearchTypography);