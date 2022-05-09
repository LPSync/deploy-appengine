import React, { memo } from "react";
import { makeStyles, Tabs } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tabs: {
    width: "250px",
    borderRight: `1px solid ${theme.palette.divider}`
  },
}));

const CustomTabs = ({...props}) => {
  const classes = useStyles();
  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      aria-label="Vertical tabs example"
      className={classes.tabs}
      {...props}
    />
  );
};

export default memo(CustomTabs);