import React, {memo} from "react";
import {Box, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  info: {
    backgroundColor: theme.palette.secondary.dark,
    padding: "0.5em 0.75em 0.5em"
  }
}));

const SelectedTaskInfoBlock = ({condition, text, children}) => {
  const classes = useStyles();

  return (
    <>
      {condition &&
      <Box>
        <Paper className={classes.info}>
          <Typography>
            {text}
          </Typography>
        </Paper>
        {children}
      </Box>
      }
    </>
  );
};

export default memo(SelectedTaskInfoBlock);