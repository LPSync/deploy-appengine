import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { ListItem, ListItemIcon, makeStyles } from "@material-ui/core";
import NavListItemText from "./NavListItemText";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const NavListItem = ({ text, icon, ...props }) => {
  const classes = useStyles();
  return (
    <ListItem
      button
      component={NavLink}
      activeClassName={classes.active}
      {...props}
    >
      {icon && (
        <ListItemIcon>
          {icon}
        </ListItemIcon>
      )}

      {text && <NavListItemText primary={text}/>}
    </ListItem>
  )
};

NavListItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node
};
export default memo(NavListItem);
