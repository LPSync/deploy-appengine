import React, {memo, useCallback} from "react";
import {makeStyles, TextField} from "@material-ui/core";
import PropTypes from "prop-types";
import Page from "../Page";

const useStyles = makeStyles(() => ({
  textField: {
    width: "60ch",
  },
  smallTextField: {
    width: "30ch",
  },
}));

const CustomTextField = ({onChange, onValueChange, small, valid, ...props}) => {
  const classes = useStyles();

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
      onValueChange && onValueChange(e.target.value);
    },
    [onChange, onValueChange]
  );

  return (
    <TextField
      color="secondary"
      className={small ? classes.smallTextField : classes.textField}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      {...props}
    />
  );
};

Page.propTypes = {
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  small: PropTypes.bool,
};

export default memo(CustomTextField);
