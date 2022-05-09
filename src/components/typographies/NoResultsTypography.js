import {Typography} from "@material-ui/core";
import React, {memo} from "react";

const NoResultsTypography = ({...args}) => {
  return (
    <Typography component={"div"} {...args}>
      No Results
    </Typography>
  );
};

export default memo(NoResultsTypography);
