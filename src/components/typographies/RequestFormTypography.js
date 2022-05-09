import React, { memo } from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  leftText: {
    paddingLeft: theme.spacing(5),
  }
}));

const RequestFormTypography = ({ title, subtitle }) => {
  const classes = useStyles();
  return (
    <>
      {title && (
        <Typography component={"div"} variant="subtitle1" className={classes.leftText}>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography component={"div"} variant="subtitle2" className={classes.leftText}>
          {subtitle}
        </Typography>
      )}
    </>
  )
}

export default memo(RequestFormTypography);