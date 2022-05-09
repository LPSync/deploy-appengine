import React, {memo} from "react";
import {Checkbox, withStyles} from "@material-ui/core";

const ColorCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.warning.main,
    fontSize: "5rem",
    "&$checked": {
      color: theme.palette.warning.main,
      fontSize: "5rem",
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);

export default memo(ColorCheckbox);
