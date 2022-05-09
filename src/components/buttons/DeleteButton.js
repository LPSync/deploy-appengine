import React, {memo} from "react";
import {Button, makeStyles} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  btn: {
    fontSize: ".7rem",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.15rem",
  },
}));

const DeleteButton = ({...props}) => {
  const classes = useStyles();

  return (
    <Button variant="outlined" size="small" className={classes.btn} {...props}>
      <DeleteIcon className={classes.icon} />
      Delete
    </Button>
  );
};

export default memo(DeleteButton);
