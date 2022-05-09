import React, {memo} from "react";
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  box: {
    height: (props) => props.height,
    width: (props) => props.width,
    overflow: "auto",
    border: "1px solid #4667c8",
    borderRadius: "5px",
    paddingLeft: "1rem",
  },
}));

const ColorBorderBox = ({children, height, width}) => {
  const classes = useStyles({height, width});

  return (
    <Box m={2} className={classes.box}>
      {children}
    </Box>
  );
};

export default memo(ColorBorderBox);
