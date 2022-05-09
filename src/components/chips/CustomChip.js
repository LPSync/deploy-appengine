import React, {memo} from "react";
import {Chip, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  chip: {
    margin: ".25rem",
  },
}));

const CustomChip = ({label, className, ...props}) => {
  const classes = useStyles();

  return (
    <span>
      <Chip
        id={label}
        size="small"
        variant="outlined"
        label={label}
        className={`${classes.chip} ${className || ""}`}
        {...props}
      />
    </span>
  );
};

export default memo(CustomChip);
