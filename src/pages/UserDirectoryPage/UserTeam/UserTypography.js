import React, {memo} from "react";
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  userTypography: {
    fontSize: "1.25rem",
    fontWeight: 400,
    lineHeight: 2.25,
    overflowX: "hidden",
    whiteSpace: "nowrap",
    width: "inherit"
  },
  text: {
    paddingRight: 20,
    whiteSpace: "nowrap",
    display: "inline"
  },
  line: {
    width: "100%",
    display: "inline-block"
  }
}));

const UserTypography = ({title, ...props}) => {
  const classes = useStyles();

  return (
    <Typography className={classes.userTypography} component="div" {...props}>
      <p className={classes.text}>
        {title}
      </p>
      <hr className={classes.line} />
    </Typography>
  );
};

export default memo(UserTypography);