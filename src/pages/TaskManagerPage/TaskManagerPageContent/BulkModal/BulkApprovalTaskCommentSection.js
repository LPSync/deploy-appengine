import React, { memo } from "react";
import { Box, Typography } from "@material-ui/core";

const BulkApprovalTaskCommentSection = ({ commentSection }) => {
  if (!commentSection) {
    return null;
  }
  return (
    <Box pl={5.5} pr={2} pt={2}>
      <Typography variant="subtitle1">
        <strong> Comments: </strong>
        {commentSection}
      </Typography>
    </Box>
  );
};

export default memo(BulkApprovalTaskCommentSection);