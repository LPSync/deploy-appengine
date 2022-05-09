import React, {memo} from "react";
import {Box, Button, Typography} from "@material-ui/core";
import CustomModal from "./CustomModal";

const AlreadyExistUsernameModal = ({open, handleClose, id}) => {
  return (
    <CustomModal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Typography component={"div"} variant="body1">
        Username already exists {id && "in row with id: " + id}
      </Typography>
      <Box mt={1} mb={2}>
        <Typography component={"div"} variant="body2">
          If you want to reactivate an existing user please open a support
          ticket to IT.
        </Typography>

        <br />
        <Typography component={"div"} variant="subtitle1">
          (Go to your LivePerson Hub &gt; ServiceNow Assist){" "}
        </Typography>
        <br />
        <Typography component={"div"} variant="body2">
          Please click continue to create a new user with a unique username.
        </Typography>
      </Box>
      <Button
        size="small"
        onClick={handleClose}
        color="secondary"
        variant="outlined"
      >
        Continue
      </Button>
    </CustomModal>
  );
};

export default memo(AlreadyExistUsernameModal);
