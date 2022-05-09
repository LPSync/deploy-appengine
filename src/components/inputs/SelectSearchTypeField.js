import React, {memo} from "react";
import {makeStyles, MenuItem, Select} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  select: {
    width: 150,
    margin: "8px 0 6px 8px",
    background: theme.palette.primary.main,
    height: "fit-content"
  },
  filled: {
    paddingTop: 15,
    paddingBottom: 14,
    fontSize: "1rem",
    textAlign: "center",
  },
}));

const SelectSearchTypeField = ({searchType, handleChange, types, ...props}) => {
  const classes = useStyles();

  return (
    <Select
      value={searchType}
      onChange={(e) => handleChange(e.target.value)}
      className={classes.select}
      variant="filled"
      classes={{filled: classes.filled}}
      size="small"
      color="secondary"
      margin="dense"
      {...props}
    >
      {Object.values(types)?.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export default memo(SelectSearchTypeField);
