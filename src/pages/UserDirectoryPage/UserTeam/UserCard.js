import React, {memo} from "react";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import {Box, makeStyles, Typography} from "@material-ui/core";
import UserImg from "../../../components/UserImg";
import {useHistory} from "react-router-dom";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import {getProfileName} from "../../../data/helper/helpers";
import ViewButton from "../../../components/buttons/ViewButton";
import UserCardBadges from "../../../components/badges/UserCardBadges";

const useStyles = makeStyles((theme) => ({
  paperCard: {
    width: "fit-content",
  },
  card: {
    backgroundColor: theme.palette.primary.light,
    overflow: "inherit",
    cursor: "pointer",
  },
  content: {
    padding: theme.spacing(2) + "px !important",
    width: 260,
  },
  cardBox: {
    height: "100%",
    minHeight: 305,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nameText: {
    lineHeight: 2,
    textAlign: "center",
  },
  text: {
    fontSize: "1rem",
    lineHeight: 2,
    textAlign: "center",
  },
}));

const UserCard = ({profile}) => {
  const history = useHistory();
  const classes = useStyles();

  const handleOnClick = () => {
    if (profile?.userName) {
      history.push(FrontendRoutes.USER_DIRECTORY_PROFILE(profile?.userName));
    }
  };

  return (
    <PaperCardWrapper
      paperClassName={classes.paperCard}
      className={classes.card}
      contentClassName={classes.content}
      onClick={handleOnClick}
    >
      <Box className={classes.cardBox}>
        <Box className={classes.boxContent}>
          <UserImg large email={profile?.email} />

          <Typography
            component={"div"}
            variant="h5"
            className={classes.nameText}
          >
            {getProfileName(profile)}
          </Typography>

          <Typography component={"div"} variant="h6" className={classes.text}>
            {profile?.jobTitle}
          </Typography>

          <Typography component={"div"} variant="h6" className={classes.text}>
            {profile?.location}
          </Typography>

          <UserCardBadges userEmail={profile?.email} />
        </Box>

        <ViewButton text="View Profile" />
      </Box>
    </PaperCardWrapper>
  );
};

export default memo(UserCard);
