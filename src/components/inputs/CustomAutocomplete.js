import React, {memo} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AutoTextField from "./AutoTextField";

const CustomAutocomplete = ({textFieldProps, onValueChange, ...props}) => {
  return (
    <Autocomplete
      freeSolo
      autoSelect
      blurOnSelect
      onChange={(event, newValue) => {
        onValueChange(newValue);
      }}
      renderInput={(params) => (
        <AutoTextField
          {...params}
          {...textFieldProps}
        />
      )}
      {...props}
    />
  )
}

export default memo(CustomAutocomplete);