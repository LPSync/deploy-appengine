import React, { memo } from "react";
import {Box, Card, CardContent, Paper} from "@material-ui/core";

const PaperCardWrapper = ({ children, paperClassName, contentClassName, ...props }) => {
  return (
    <Box pb={1}>
      <Paper elevation={3} className={paperClassName}>
        <Card {...props}>
          <CardContent className={contentClassName}>
            {children}
          </CardContent>
        </Card>
      </Paper>
    </Box>
  )
}

export default memo(PaperCardWrapper)