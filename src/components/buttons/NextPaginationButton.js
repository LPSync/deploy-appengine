import React, {memo} from "react";
import {Button} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const NextPaginationButton = ({...props}) => {
  return (
    <Button size="small" {...props}>
      <NavigateNextIcon />
    </Button>
  );
};

export default memo(NextPaginationButton);
