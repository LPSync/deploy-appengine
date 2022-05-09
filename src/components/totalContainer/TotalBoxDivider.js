import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  divider: {
    borderRight: "2px solid #87889c",
    marginRight: theme.spacing(2),
  },
}));

const TotalBoxDivider = () => {
  const classes = useStyles();

  return <Box className={classes.divider} />;
};

export default TotalBoxDivider;
