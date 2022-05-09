import React, { memo } from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  applyFilterBtn: {
    marginLeft: theme.spacing(2),
  },
}));

const ApplyFiltersButton = ({ handleClick, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.applyFilterBtn}
      variant="contained"
      color="secondary"
      onClick={handleClick}
      {...props}
    >
      Apply Filter
    </Button>
  );
};

export default memo(ApplyFiltersButton);