import React, {memo} from "react";
import {Box, Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  submitBtnBox: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const SubmitButtonBox = ({onSubmit}) => {
  const classes = useStyles();
  return (
    <Box m={2} className={classes.submitBtnBox}>
      <Button
        variant="contained"
        color="secondary"
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Box>
  )
}

export default memo(SubmitButtonBox);