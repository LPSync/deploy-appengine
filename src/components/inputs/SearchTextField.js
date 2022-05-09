import React, {memo} from "react";
import {
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  searchTextField: {
    width: "58ch",
    "& .MuiFilledInput-root": {
      background: theme.palette.primary.main,
    },
    "& .MuiInputLabel-filled": {
      fontSize: "0.75rem",
      lineHeight: 1.5,
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink.MuiInputLabel-marginDense": {
      width: "calc(58ch * 4 / 3)",
    },
    "& .MuiFormHelperText-root": {
      width: "max-content",
    },
  },
}));

const SearchTextField = ({
  className,
  value,
  handleChange,
  handleClose,
  ...props
}) => {
  const classes = useStyles();

  const closeHandler = () => {
    handleChange("");
    if (handleClose)
      handleClose();
  };

  return (
    <TextField
      variant="filled"
      size="small"
      color="secondary"
      margin="dense"
      autoComplete="off"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className={className || classes.searchTextField}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={closeHandler} edge="end">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default memo(SearchTextField);
