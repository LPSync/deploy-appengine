import React, { memo } from "react";
import { ListItemText, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  listItemText: {
    fontSize: ".9rem",
  }
}));

const NavListItemText = ({ ...props }) => {
  const classes = useStyles();
  return (
    <ListItemText
      classes={{ primary: classes.listItemText }}
      {...props}
    />
  )
};

export default memo(NavListItemText);