import React, {memo} from "react";
import {Tab, withStyles} from "@material-ui/core";

const StyledTab = withStyles((theme) => ({
  root: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.light,
    },
  },
  selected: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
  },
}))((props) => <Tab {...props} />);

export default memo(StyledTab);
