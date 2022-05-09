import React, {memo} from "react";
import {Button, makeStyles} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.15rem",
  },
}));

const ViewButton = ({text, ...props}) => {
  const classes = useStyles();

  return (
    <Button variant="outlined" size="small" {...props}>
      <VisibilityIcon className={classes.icon} />
      {text ? text : "View Task"}
    </Button>
  );
};

export default memo(ViewButton);
