import React, {memo, useEffect, useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AutocompleteTextField from "../../../../components/inputs/AutocompleteTextField";

const LaptopField = ({label, options, value, setValue, error, setError}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value]);

  return (
    <Autocomplete
      freeSolo
      autoSelect
      blurOnSelect
      options={options}
      getOptionLabel={(option) => option}
      style={{width: 400}}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      getOptionSelected={(option, value) => option === value}
      inputValue={input}
      onInputChange={(event, newInputValue) => {
        setInput(newInputValue);
        if (error) {
          setError(false);
        }
      }}
      renderInput={(params) => (
        <AutocompleteTextField
          {...params}
          error={error}
          required
          label={label}
        />
      )}
    />
  );
};

export default memo(LaptopField);