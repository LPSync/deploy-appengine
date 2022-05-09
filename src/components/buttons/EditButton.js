import React, {memo} from "react";
import {Button, makeStyles} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

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
      <EditIcon className={classes.icon} />
      Edit
    </Button>
  );
};

export default memo(DeleteButton);
