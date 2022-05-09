import React, {memo} from "react";
import {Box} from "@material-ui/core";
import PageTitle from "../PageTitle";

const PageTitleBox = ({title, children, ...props}) => {
  return (
    <Box minWidth={1050} mt={2} mb={3} {...props}>
      <PageTitle>{title}</PageTitle>
      {children}
    </Box>
  );
};

export default memo(PageTitleBox);