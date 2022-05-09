import React, {memo} from "react";
import {Box, Button, CircularProgress, makeStyles} from "@material-ui/core";
import CustomModal from "../../../../components/modals/CustomModal";
import {useMutation} from "@apollo/client";
import {DELETE_LAPTOP_OPTION} from "../../../../operations/adminMutations/deleteLaptopOption";

const useStyles = makeStyles(() => ({
  btn: {
    fontSize: ".75rem",
  },
  modalBtnBox: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const DeleteLaptopModal = ({selectedLaptop, open, handleClose, onComplete, createLog}) => {
  const classes = useStyles();

  const [deleteLaptop, {error: deleteError, loading}] = useMutation(
    DELETE_LAPTOP_OPTION, {
      onCompleted: () => onComplete(),
    },
  );

  if (deleteError) {
    createLog(
      "alert",
      `Candidate Portal Setting >> Error - Laptop option deleted; errorMsg: ${deleteError.message}`,
    );
  }

  const handleDeleteLaptop = () => {
    deleteLaptop({
      variables: {
        id: selectedLaptop?.id,
      }
    });
    createLog(
      "info",
      `Candidate Portal Setting >> Laptop option deleted; laptopInfo: ${selectedLaptop?.laptopType} - ${
        selectedLaptop?.laptopLanguage} ${selectedLaptop?.laptopAvailability ? "active" : ""};`
    );
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      aria-labelledby="remove-modal"
      aria-describedby="remove-modal"
      height={140}
    >
      <Box>
        <Box mb={2}>
          Are you sure you want to delete laptop: {" "}
          <strong>{selectedLaptop?.laptopType || ""} - {selectedLaptop?.laptopLanguage || ""}</strong>?
        </Box>
        <Box className={classes.modalBtnBox}>
          <Button
            variant="outlined"
            size="small"
            className={classes.btn}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.btn}
            onClick={handleDeleteLaptop}
          >
            {loading && <CircularProgress size={15} color="secondary"/>}
            Confirm
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default memo(DeleteLaptopModal);