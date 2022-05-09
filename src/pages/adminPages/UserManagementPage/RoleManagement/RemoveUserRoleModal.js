import React, { memo } from "react";
import CustomModal from "../../../../components/modals/CustomModal";
import { Box, Button, makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { REMOVE_ROLE_USER } from "../../../../operations/adminMutations/removeRoleUser";

const useStyles = makeStyles(() => ({
  btn: {
    fontSize: ".75rem"
  },
  modalBtnBox: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

const RemoveUserRoleModal = ({open, handleClose, createLog, selectedRemoveRole, selectedRemoveUser, onComplete}) => {
  const classes = useStyles();

  const [removeRoleUser, { error: removeError }] = useMutation(
    REMOVE_ROLE_USER, {
      onCompleted: () => onComplete()
    }
  );

  if (removeError) {
    createLog(
      "alert",
      `User Management >> Error - User removed from role; errorMsg: ${removeError.message}`
    );
  }

  const handleRemoveRoleUser = (roleId, userId) => {
    removeRoleUser({
      variables: {
        roleId: roleId,
        userId: userId
      }
    });
    createLog(
      "info",
      `User Management >> User removed from role; roleName: ${roleId}; userName: ${userId};`
    );
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      aria-labelledby="remove-modal"
      aria-describedby="remove-modal"
    >
      <Box>
        <Box mb={2}>
          Are you sure you want to remove{" "}
          <strong>{selectedRemoveUser.toUpperCase()}</strong>?
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
            onClick={() => {
              handleRemoveRoleUser(selectedRemoveRole, selectedRemoveUser);
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </CustomModal>
  )
}

export default memo(RemoveUserRoleModal);