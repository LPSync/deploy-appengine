import React, {memo, useState} from "react";
import {Backdrop, Fade, makeStyles, Modal} from "@material-ui/core";

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = (middlePosition) => {
  const top = 50 + (middlePosition ? 0 : rand());
  const left = 50 + (middlePosition ? 0 : rand());

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  smallPaper: {
    minWidth: (props) => props.minwidth || props.width || 400,
    width: (props) => props.width || 400,
    maxWidth: "90%",
    minHeight: (props) => props.height || 400,
    height: (props) => props.height || 400,
  },
  largePaper: {
    display: "flex",
    flexDirection: "column",
    minHeight: 400,
    maxHeight: "80%",
    width: "70%",
    maxWidth: 900,
  },
}));

const CustomModal = ({children, large, width, minwidth, height, middlePosition, ...props}) => {
  const classes = useStyles({width, minwidth, height});
  const [modalStyle] = useState(getModalStyle(middlePosition));

  return (
    <Modal
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{timeout: 300}}
      {...props}
    >
      <Fade in={props.open} timeout={300}>
        <div
          style={modalStyle}
          className={`${classes.paper} ${
            large ? classes.largePaper : classes.smallPaper
          }`}
        >
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

export default memo(CustomModal);
