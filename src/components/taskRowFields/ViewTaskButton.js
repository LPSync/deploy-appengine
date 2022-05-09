import React, {memo} from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.15rem",
  },
}));

const ViewTaskButton = ({}) => {
  const classes = useStyles();

  return (
    <Button variant="outlined" size="small">
      <VisibilityIcon className={classes.icon}/>
      View Task
    </Button>
  )
}

export default memo(ViewTaskButton);