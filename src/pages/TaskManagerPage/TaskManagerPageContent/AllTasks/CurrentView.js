import React, {memo} from "react";
import {
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 250,
  },
}));

const taskNames = [
  { value: "active", label: "Active Tasks Only" },
  { value: "all", label: "All Tasks" },
  { value: "inactive", label: "Inactive Tasks Only" },
];

const CurrentView = ({ currentView, onCurrentViewChange }) => {
  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <InputLabel id="viewing-label">Current View</InputLabel>
      <Select
        labelId="viewing-label"
        id="select-viewing"
        value={currentView}
        onChange={(event) => onCurrentViewChange && onCurrentViewChange(event.target.value)}
        label="Current View"
      >
        {taskNames?.map((task) => (
          <MenuItem key={task.value} value={task.value}>
            {task.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default memo(CurrentView);
