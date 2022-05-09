import React, {memo} from "react";
import {Box, Typography} from "@material-ui/core";

const ActionSection = ({text, children}) => {
  return (
    <Box m={2}>
      {text && (
        <Box mt={1} mb={2}>
          <Typography component={"div"} variant="subtitle1">
            {text}
          </Typography>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default memo(ActionSection);