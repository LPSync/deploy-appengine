import {Divider, makeStyles} from "@material-ui/core";
import React from "react";
import {Box} from "@mui/material";
import PaperCardWrapper from "../../../components/PaperCardWrapper";

const useStyles = makeStyles((theme) => ({
  block: {
    position: "relative",
  },
  blockDivider: {
    height: 1,
    backgroundColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  gradientPaper: {
    backgroundImage: theme.palette.background.gradient,
  },
}));

const SaSContainer = ({children, gradient}) => {
  const classes = useStyles();
  return (
    <Box mx={3} mt={3} className={classes.block}>
      <PaperCardWrapper className={gradient && classes.gradientPaper}>
        {children}
      </PaperCardWrapper>
    </Box>
  );
};
export default SaSContainer;
