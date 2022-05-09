import CustomModal from "../../../components/modals/CustomModal";
import {
  Box,
  Button,
  CircularProgress,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import {makeStyles} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";

const useStyles = makeStyles({
  paper: {
    border: "1px solid rgba(255, 255, 255, 0.23)",
    overflowY: "auto",
    flexGrow: 1,
  },
  link: {
    color: "#fff",
    flex: "0 0 50%",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  header: {display: "flex", justifyContent: "space-between", width: "100%"},
  content: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflowY: "auto",
    height: 380,
  },
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  cardContainer: {display: "flex", padding: 10, flex: "1 1 50%"},
  cardImg: {marginRight: 10},
});

const SaSModal = ({isModalOpen, handleModalClose, data, loading}) => {
  const members = data?.members;
  const name = data?.name;

  const classes = useStyles();

  const modalSettings = {
    open: isModalOpen,
    onClose: handleModalClose,
    "aria-labelledby": "sas-modal",
    "aria-describedby": "sas-modal",
    width: 700,
    height: 540,
    middlePosition: true,
  };
  return (
    <CustomModal {...modalSettings}>
      <Box className={classes.container}>
        <Toolbar style={{width: "100%"}}>
          <Box className={classes.header}>
            <Typography variant="h6">Team Members of {name}</Typography>
            <Button variant="outlined" size="small" onClick={handleModalClose}>
              <CloseIcon /> Close
            </Button>
          </Box>
        </Toolbar>
        <PaperCardWrapper paperClassName={classes.paper}>
          <Box className={classes.content}>
            {loading ? (
              <Box className={classes.loader}>
                <CircularProgress color="secondary" />
              </Box>
            ) : (
              members?.map((user, index) => (
                <Box className={classes.cardContainer}>
                  <Box className={classes.cardImg}>
                    <img src={user.photo} />
                  </Box>
                  <Box>
                    <NavLink
                      key={index}
                      to={FrontendRoutes.USER_DIRECTORY_PROFILE(user.userName)}
                      className={classes.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography variant="subtitle1">{`${user.firstName} ${user.lastName}`}</Typography>
                    </NavLink>
                    <Typography variant="subtitle2">{user.jobTitle}</Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </PaperCardWrapper>
      </Box>
    </CustomModal>
  );
};

export default SaSModal;
