import React, { memo } from "react";
import { Button } from "@material-ui/core";

const BulkApprovalButton = ({ handleClick, ...props }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleClick}
      {...props}
    >
      Bulk Approve
    </Button>
  );
};

export default memo(BulkApprovalButton);
