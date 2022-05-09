import React, {memo} from "react";
import {Button, makeStyles} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  btn: {
    fontSize: ".7rem",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.25rem",
  },
}));

const AddButton = ({...props}) => {
  const classes = useStyles();

  return (
    <Button color="secondary" variant="contained" size="small" {...props}>
      <AddIcon className={classes.icon} /> Add
    </Button>
  );
};

export default memo(AddButton);
