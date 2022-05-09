import React, {memo} from "react";
import {Box, Button, makeStyles} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import CustomModal from "./CustomModal";

const useStyles = makeStyles(() => ({
  modalInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: "2rem",
  },
}));

const MissedInputModal = ({open, handleClose, modalMsg}) => {
  const classes = useStyles();

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      aria-labelledby="request-form-alert"
      aria-describedby="request-form-description"
      height={"auto"}
    >
      <Box>
        <Button variant="outlined" size="small" onClick={handleClose}>
          <CloseIcon /> Close
        </Button>
      </Box>
      <Box m={2}>
        <div id="simple-modal-description" className={classes.modalInfo}>
          <Box mr={2}>
            <WarningIcon className={classes.icon} />
          </Box>
          <Box>{modalMsg}</Box>
        </div>
      </Box>
    </CustomModal>
  );
};

export default memo(MissedInputModal);
