import React, {useEffect, useState} from "react";
import {Box, Button, makeStyles, Typography} from "@material-ui/core";
import SystemOwnerBadgesInfo from "./SystemOwnerBadgesInfo";
import BadgesSearch from "./BadgesSearch";
import {useLazyQuery, useMutation} from "@apollo/client";
import {ADD_AUTH_USER_BADGES} from "../../../../operations/mutations/addAuthUserBadges";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import {UPDATE_SPLASH_SCREEN_COMPLETED} from "../../../../operations/mutations/updateSplashScreenCompleted";
import UserImgPopover from "./UserImgPopover";
import BadgeTypes from "../../../../data/constants/BadgeTypes";
import {GET_LPSYNC_USER_BADGES} from "../../../../operations/queries/getLpsyncUserBadges";
import {DELETE_AUTH_USER_BADGE} from "../../../../operations/mutations/deleteAuthUserBadge";

const useStyles = makeStyles((theme) => ({
  saveBtnBox: {
    display: "flex",
    justifyContent: "flex-end",
  },
  imgDiv: {
    marginRight: theme.spacing(1),
    height: "6rem",
  },
  img: {
    width: "6rem",
    borderRadius: "10%",
    boxShadow: "0px 10px 25px 0px rgba(0, 0, 0, 0.3)",
  },
  welcomeBox: {
    display: "flex",
    alignItems: "flex-end",
  },
}));

const SplashModal = ({name, email, setIsSplashOpen}) => {
  const classes = useStyles();
  const history = useHistory();
  const [smeSelectedBadges, setSmeSelectedBadges] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [hiSelectedBadges, setHiSelectedBadges] = useState([]);

  const [updateSplash] = useMutation(UPDATE_SPLASH_SCREEN_COMPLETED, {
    onError: (error) => handleError(error)(history),
  });

  const [addBadges] = useMutation(ADD_AUTH_USER_BADGES, {
    onCompleted: () => updateSplash(),
    onError: (error) => handleError(error)(history),
  });

  const [getUserBadges, {loading: loadingBadges}] = useLazyQuery(
    GET_LPSYNC_USER_BADGES,
    {
      onCompleted: (data) => {
        const result = data.get_lpsync_user_badges;
        if (result) {
          const smeBadges = result
            .filter(
              (b) => b.badge.badgeType === BadgeTypes.SUBJECT_MATTER_EXPERT
            )
            .map((b) => b.badge);
          const hiBadges = result
            .filter((b) => b.badge.badgeType === BadgeTypes.HOBBIES_INTERESTS)
            .map((b) => b.badge);
          setSmeSelectedBadges(smeBadges);
          setHiSelectedBadges(hiBadges);
          setUserBadges([...smeBadges, ...hiBadges]);
        }
      },
      onError: (error) => handleError(error)(history),
    }
  );

  const [deleteBadge] = useMutation(DELETE_AUTH_USER_BADGE, {
    onError: (error) => handleError(error)(history),
  });

  const handleDelete = (badgeId) => {
    if (userBadges.some((b) => b.id === badgeId)) {
      deleteBadge({
        variables: {
          badgeId: parseInt(badgeId),
        },
      });
    }
  };

  const handleSave = async () => {
    let badgeIds = [];
    if (smeSelectedBadges.length > 0) {
      smeSelectedBadges.map((badge) => {
        badgeIds.push({badgeId: parseInt(badge.id)});
      });
    }
    if (hiSelectedBadges.length > 0) {
      hiSelectedBadges.map((badge) => {
        badgeIds.push({badgeId: parseInt(badge.id)});
      });
    }

    if (badgeIds.length > 0) {
      await addBadges({
        variables: {
          input: badgeIds,
        },
      });
    }

    await setIsSplashOpen(false);
  };

  useEffect(() => {
    getUserBadges({variables: {user: email}});
  }, [email]);

  return (
    <div>
      <Box className={classes.welcomeBox}>
        <UserImgPopover email={email} />
        <Box>
          <Typography variant={"h4"}>Hi {name},</Typography>
          <Typography variant={"h4"}>Welcome to LPSync!</Typography>
        </Box>
      </Box>
      <Box mt={2}>
        <SystemOwnerBadgesInfo />
      </Box>
      <Box mt={2}>
        <BadgesSearch
          selectedBadges={smeSelectedBadges}
          setSelectedBadges={setSmeSelectedBadges}
          badgesType={BadgeTypes.SUBJECT_MATTER_EXPERT}
          deleteBadgeHandler={handleDelete}
          title="Add some Subject Matter Expert badges for yourself... "
          tooltip={
            <>
              Subject Matter Expert badges should reflect <br />
              knowledge/skills you have in a particular topic. <br />
              People can look you up based on a subject.
            </>
          }
        />
      </Box>
      <Box mt={2}>
        <BadgesSearch
          selectedBadges={hiSelectedBadges}
          setSelectedBadges={setHiSelectedBadges}
          badgesType={BadgeTypes.HOBBIES_INTERESTS}
          deleteBadgeHandler={handleDelete}
          title="Any Hobbies/Interests you want others to know about... "
          tooltip={
            <>
              Hobbies/Interests enable others to look you up <br />
              based on what you have selected.
            </>
          }
        />
      </Box>
      <Box className={classes.saveBtnBox}>
        <Button variant={"contained"} color={"secondary"} onClick={handleSave}>
          Save & Continue
        </Button>
      </Box>
    </div>
  );
};

export default SplashModal;
