import React, { memo } from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  text: { fontSize: ".92rem", fontWeight: "600", marginLeft: ".4rem" },
}));

const BreadcrumbText = ({ title }) => {
  const classes = useStyles();

  return (
    <Typography component={'div'} color="textPrimary" className={classes.text}>
      {title}
    </Typography>
  );
};

export default memo(BreadcrumbText);
