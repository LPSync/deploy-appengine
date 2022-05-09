import React from "react";
import {TextField} from "@material-ui/core";

const AutocompleteTextField = ({required, error, label, ...props}) => {
  return (
    <TextField
      {...props}
      required={required}
      error={error}
      label={label}
      variant="outlined"
      color={"secondary"}
    />
  );
};

export default AutocompleteTextField;
