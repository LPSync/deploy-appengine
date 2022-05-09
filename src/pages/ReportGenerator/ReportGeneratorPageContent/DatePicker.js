import React from "react";
import {Box, TextField, FormControl} from "@material-ui/core";

const DatePicker = ({label, setDate}) => {
  const handleChange = (value) => {
    setDate(value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <TextField
          id={`date-${label}`}
          label={label ?? 'Select date'}
          type="date"
          defaultValue={null}
          onChange={(e) => handleChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
    </Box>
  );
};

export default DatePicker;
