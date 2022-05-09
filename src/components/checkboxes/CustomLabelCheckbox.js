import React, {memo} from "react";
import ColorCheckbox from "./ColorCheckbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {FormControlLabel, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  label: {
    fontSize: "1rem",
  },
}));

const CustomLabelCheckbox = ({label, name, ...props}) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      classes={{label: classes.label}}
      control={
        <ColorCheckbox
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          name={name}
          {...props}
        />
      }
      label={label}
    />
  );
};

export default memo(CustomLabelCheckbox);
