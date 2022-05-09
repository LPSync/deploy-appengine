import React, {memo} from "react";
import {Chip, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  chip: {
    margin: ".25rem",
  },
}));

const DelegateChip = ({delegate, className, ...props}) => {
  const classes = useStyles();

  const delegateLabel = delegate?.delegateTo
    ? delegate?.delegateTo
    : delegate?.delegateCompany;

  return (
    <span>
      <Chip
        id={delegate?.id || delegateLabel}
        size="small"
        variant="outlined"
        label={delegateLabel}
        className={`${classes.chip} ${className || ""}`}
        {...props}
      />
    </span>
  );
};

export default memo(DelegateChip);
