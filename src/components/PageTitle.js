import React, {memo} from "react";
import {Typography} from "@material-ui/core";

const PageTitle = ({children}) => {
  return (
    <Typography component="h2" variant="h2">
      {children}
    </Typography>
  );
};

export default memo(PageTitle);
