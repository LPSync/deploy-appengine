import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { CREATE_HRTERMINATION_CODE } from "../../../../operations/adminMutations/createHRTerminationCode";
import CustomModal from "../../../../components/modals/CustomModal";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.1rem",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  textField: {
    width: "40ch",
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AddCodeModal = (props) => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [createHRTerminationCode] = useMutation(CREATE_HRTERMINATION_CODE, {
    onCompleted: () => onComplete(),
  });

  const onComplete = () => {
    setIsComplete(true);
    resetComplete();
  };

  const resetComplete = () => {
    setTimeout(() => {
      setIsComplete(false);
    }, 5000);
  };

  const saveCode = () => {
    if (code.length > 0) {
      createHRTerminationCode({
        variables: {
          input: {
            terminationCode: code,
          },
        },
      });
      setCode("");
      props.refetch();
    } else {
      setIsError(true);
    }
  };

  const handleClear = () => {
    setCode("");
    setIsError(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    props.refetch();
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleModalOpen}
      >
        <AddIcon className={classes.icon} /> Add New Code
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
            <CloseIcon /> Close
          </Button>
        </Box>
        <Box m={2}>
          {isComplete && (
            <Box className={classes.alert} my={1}>
              <Alert severity="success">New code added</Alert>
            </Box>
          )}
          <Box mb={2}>
            <Typography component={"div"}>
              Add a New Termination Code
            </Typography>
          </Box>
          <Box m={2}>
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
            <Button variant="outlined" onClick={() => handleClear()}>
              Clear
            </Button>

            <Button
              color="secondary"
              variant="contained"
              onClick={() => saveCode()}
            >
              Save
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export default AddCodeModal;
