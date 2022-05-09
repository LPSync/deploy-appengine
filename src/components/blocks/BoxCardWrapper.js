import React, {memo} from "react";
import {Box, Card, CardContent, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(()=> ({
  viewBox: {
    border: "1px solid #87889c",
    borderRadius: "5px",
  },
}));

const BoxCardWrapper = ({ ...props}) => {
  const classes= useStyles();

  return (
    <Box mt={2} minWidth={1050} className={classes.viewBox}>
      <Card>
        <CardContent {...props}/>
      </Card>
    </Box>
  )
}

export default memo(BoxCardWrapper);