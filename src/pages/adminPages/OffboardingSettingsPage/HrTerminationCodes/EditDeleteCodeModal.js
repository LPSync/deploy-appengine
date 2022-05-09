import React, { memo, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { UPDATE_HRTERMINATION_CODE } from "../../../../operations/mutations/updateHRTerminationCode";
import { DELETE_HRTERMINATION_CODE } from "../../../../operations/mutations/deleteHRTerminationCode";
import CustomModal from "../../../../components/modals/CustomModal";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.1rem"
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between"
  },
  editBtn: { fontSize: ".75rem" },
  deleteBtn: { color: "#ca2929" },
  cancelBtn: { marginRight: theme.spacing(1) },
  textField: {
    width: "40ch"
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const EditDeleteCodeModal = ({ id, terminationCode, setIsLoading, refetch }) => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState(terminationCode);
  const [isError, setIsError] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [updateHRTerminationCode, { updateLoading }] = useMutation(
    UPDATE_HRTERMINATION_CODE, {
      onCompleted: () => onComplete()
    }
  );
  const [deleteHRTerminationCode, { deleteLoading }] = useMutation(
    DELETE_HRTERMINATION_CODE
  );

  useEffect(() => {
    if (updateLoading || deleteLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [updateLoading, deleteLoading, setIsLoading]);

  const onComplete = () => {
    setIsComplete(true);
    resetComplete();
  };

  const resetComplete = () => {
    setTimeout(() => {
      setIsComplete(false);
    }, 5000);
  };

  const updateCode = (event) => {
    event.preventDefault();
    const intID = parseInt(id);

    if (code?.length > 0) {
      updateHRTerminationCode({
        variables: {
          id: intID,
          terminationCode: code
        }
      });
    } else {
      setIsError(true);
    }
  };

  const deleteCode = (event) => {
    event.preventDefault();
    const intID = parseInt(id);

    deleteHRTerminationCode({
      variables: {
        id: intID
      }
    });
    refetch();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setCode(terminationCode);
    setIsError(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    refetch();
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        onClick={handleModalOpen}
        className={classes.editBtn}
      >
        <EditIcon className={classes.icon}/> Edit/Delete
      </Button>

      <CustomModal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="termination-codes"
        aria-describedby="termination-codes"
        width={500}
      >
        <Box>
          <Button variant="outlined" size="small" onClick={handleModalClose}>
            <CloseIcon/> Close
          </Button>
        </Box>
        <Box m={2}>
          {isComplete && (
            <Box className={classes.alert} my={1}>
              <Alert severity="success">Code updated</Alert>
            </Box>
          )}
          <Box mb={2}>
            <Typography component={"div"}>
              Edit/Delete Termination Code: <strong>{terminationCode}</strong>
            </Typography>
          </Box>
          <Box m={2}>
            {" "}
            <TextField
              id="outlined-basic"
              label="code"
              color="secondary"
              variant="outlined"
              margin="dense"
              autoComplete="off"
              error={isError}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setIsError(false);
                setIsComplete(false);
              }}
              className={classes.textField}
            />
          </Box>
          <Box m={2} className={classes.btnBox}>
            <div>
              <Button
                size="small"
                variant="outlined"
                className={classes.deleteBtn}
                onClick={deleteCode}
              >
                Delete
              </Button>
            </div>
            <div>
              <Button
                size="small"
                variant="outlined"
                className={classes.cancelBtn}
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>

              <Button
                size="small"
                color="secondary"
                variant="contained"
                type="submit"
                onClick={updateCode}
              >
                Update
              </Button>
            </div>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export default memo(EditDeleteCodeModal);
