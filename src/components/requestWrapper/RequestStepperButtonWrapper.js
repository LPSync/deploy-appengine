import React, { memo } from "react";
import { Box, Grid } from "@material-ui/core";

const RequestStepperButtonWrapper = ({children, topMargin}) => {
  return (
    <Box my={topMargin || 2}>
      <Grid container justifyContent="flex-end">
        <Grid item>
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}

export default memo(RequestStepperButtonWrapper);