import React, { memo } from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  modalTopBox: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ModalTopBar = ({ title, handleClose }) => {
  const classes = useStyles();
  return (
    <Box className={classes.modalTopBox}>
      <Typography component={"div"} variant="body1"> {title} </Typography>
      <Button variant="outlined" size="small" onClick={handleClose}>
        <CloseIcon /> Close
      </Button>
    </Box>
  );
};

export default memo(ModalTopBar);