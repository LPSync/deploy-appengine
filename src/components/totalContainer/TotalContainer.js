import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  totalContainer: { width: "100%", display: "flex", flexDirection: "row" },
}));

const TotalContainer = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.totalContainer}> {children} </Box>;
};

export default TotalContainer;
