import React, {memo} from "react";
import {Box, Button, Popover} from "@material-ui/core";

const PowerSettingPopover = ({anchorEl, handleClose, logout}) => {
  return (
    <Popover
      id={!!anchorEl ? "simple-popover" : undefined}
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box m={3}>
        <Button onClick={logout} variant="contained" color="secondary">
          Log Out
        </Button>{" "}
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Popover>
  );
};

export default memo(PowerSettingPopover);
