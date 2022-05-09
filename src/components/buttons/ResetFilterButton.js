import React, {memo} from "react";
import {Button} from "@material-ui/core";

const ResetFiltersButton = ({handleClick, ...props}) => {
  return (
    <Button variant="contained" onClick={handleClick} {...props}>
      Reset Filters
    </Button>
  );
};

export default memo(ResetFiltersButton);
