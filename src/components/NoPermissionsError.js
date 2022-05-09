import React from "react";
import { Box, Typography } from "@material-ui/core";

const NoPermissionsError = () => {
  return (
    <Box ml={5} mt={5}>
      <Typography component={'div'}>Insufficient Permissions</Typography>
    </Box>
  );
};

export default NoPermissionsError;
