import React, {memo} from "react";
import {Box, Button, makeStyles, Toolbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  closeToolbar: {
    flexShrink: 0,
    background: theme.palette.background.light,
  },
  btnDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const TaskCloseButtonToolbar = ({handleClose}) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.closeToolbar}>
      <Box className={classes.btnDiv}>
        <Button variant="contained" size="small" onClick={handleClose}>
          <CloseIcon /> Close
        </Button>
      </Box>
    </Toolbar>
  );
};

export default memo(TaskCloseButtonToolbar);
