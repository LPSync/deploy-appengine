import React, {memo} from "react";
import {Box} from "@material-ui/core";
import PaperCardWrapper from "../PaperCardWrapper";

const RequestFormWrapper = ({children, height}) => {
  return (
    <Box minWidth={1050} height={height}>
      <PaperCardWrapper>{children}</PaperCardWrapper>
    </Box>
  );
};

export default memo(RequestFormWrapper);
