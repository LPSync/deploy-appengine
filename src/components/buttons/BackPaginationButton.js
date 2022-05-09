import React, {memo} from "react";
import {Button} from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const BackPaginationButton = ({...props}) => {
  return (
    <Button size="small" {...props}>
      <NavigateBeforeIcon />
    </Button>
  );
};

export default memo(BackPaginationButton);
