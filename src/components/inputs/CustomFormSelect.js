import React, {memo} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

const CustomFormSelect = ({
  name,
  label,
  required,
  value,
  onValueChange,
  onChange,
  options,
  width,
  withoutEmptyOption,
  selectClasses,
  inputLabelClasses,
  error,
  setError,
  ...props
}) => {
  const handleChange = (e) => {
    onValueChange && onValueChange(e.target.value);
    onChange && onChange(e);
    if (error) {
      setError(false);
    }
  };

  return (
    <FormControl
      required={required}
      color="secondary"
      variant="outlined"
      {...props}
    >
      <InputLabel
        id={`select-${name}-label`}
        classes={{outlined: inputLabelClasses}}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`select-${name}-label`}
        label={label}
        id={`select-${name}`}
        value={value}
        onChange={handleChange}
        style={{width: width}}
        classes={{select: selectClasses}}
        error={error}
      >
        {!withoutEmptyOption && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}

        {options?.map((option) => (
          <MenuItem
            key={option?.value || option}
            value={option?.value || option}
          >
            {option?.name || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default memo(CustomFormSelect);
