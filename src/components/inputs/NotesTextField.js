import React, { memo, useCallback } from "react";
import {TextField} from "@material-ui/core";

export const NotesTextField = ({onValueChange, onChange, ...props}) => {
  const handleChange = useCallback((e) => {
    onValueChange && onValueChange(e.target.value);
    onChange && onChange(e);
  }, [onValueChange, onChange]);

  return (
    <form noValidate autoComplete="off">
      <TextField
        variant="outlined"
        multiline
        minRows={2}
        maxRows={4}
        style={{width: "100%"}}
        inputProps={{maxLength: 191}}
        helperText="maximum length is 191 characters"
        onChange={handleChange}
        {...props}
      />
    </form>
  );
};

export default memo(NotesTextField);
