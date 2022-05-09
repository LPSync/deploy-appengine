import React, { memo } from "react";
import { Button, makeStyles } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const RefreshButton = ({ handleClick, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleClick}
      {...props}
    >
      <RefreshIcon className={classes.icon} />
      Refresh
    </Button>
  );
};

export default memo(RefreshButton);
