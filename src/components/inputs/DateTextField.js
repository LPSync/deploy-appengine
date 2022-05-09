import React, {memo} from "react";
import clsx from "clsx";
import {makeStyles, TextField} from "@material-ui/core";
const dateFormat = require("dateformat");

const useStyles = makeStyles(() => ({
  dateTimeField: {
    width: "30ch",
  },
  dateField: {
    width: "20ch",
  },
}));

const DateTextField = ({
  type,
  label,
  error,
  setError,
  value,
  onValueChange,
  minDateInDays,
}) => {
  const classes = useStyles();
  const nowDateTime = dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM");
  const minDate = minDateInDays
    ? new Date().getDate() + minDateInDays
    : new Date().getDate();
  const nowDate = dateFormat(new Date().setDate(minDate), "yyyy-mm-dd");

  const handleChange = (e) => {
    const targetValue = e.target.value;
    onValueChange && onValueChange(targetValue);

    if (targetValue && error) {
      setError(false);
    }
  };
  return (
    <form noValidate>
      <TextField
        required
        color={"secondary"}
        id={type}
        label={label}
        type={type}
        error={error}
        value={value}
        onChange={handleChange}
        className={clsx(
          type === "date" ? classes.dateField : classes.dateTimeField
        )}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: type === "date" ? nowDate : nowDateTime,
        }}
      />
    </form>
  );
};

export default memo(DateTextField);
