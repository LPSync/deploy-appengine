import React, {memo, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {Box, makeStyles, Typography} from "@material-ui/core";
import {DELETE_AUTH_USER_BADGE} from "../../../../../operations/mutations/deleteAuthUserBadge";
import handleError from "../../../../../data/handleError";
import BadgeTypes from "../../../../../data/constants/BadgeTypes";
import InfoBlock from "../../../../../components/InfoBlock";
import LoadingCircle from "../../../../../components/circularProgress/LoadingCircle";
import ColorBorderBox from "../../../../../components/blocks/ColorBorderBox";
import BadgeChip from "../../../../../components/badges/BadgeChip";

const useStyles = makeStyles(() => ({
  badgeTitleBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
}));

const EditBadgesTab = ({userBadgeData, refetch}) => {
  const classes = useStyles();
  const history = useHistory();
  const [hobbiesBadges, setHobbiesBadges] = useState();
  const [smeBadges, setSmeBadges] = useState();
  const [isBadgesReady, setIsBadgesReady] = useState(false);

  useEffect(() => {
    if (userBadgeData) {
      separateBadges(userBadgeData);
    }
  }, [userBadgeData]);

  const [deleteBadge] = useMutation(DELETE_AUTH_USER_BADGE, {
    onError: (error) => handleError(error)(history),
  });

  const separateBadges = (data) => {
    const hobbies = data.filter(
      (x) => x.badge.badgeType === BadgeTypes.HOBBIES_INTERESTS
    );
    const sme = data.filter(
      (x) => x.badge.badgeType === BadgeTypes.SUBJECT_MATTER_EXPERT
    );

    setHobbiesBadges(hobbies);
    setSmeBadges(sme);
    setIsBadgesReady(true);
  };

  const handleDelete = async (chip) => {
    await deleteBadge({
      variables: {
        badgeId: parseInt(chip.badge.id),
      },
    });

    if (chip.badge.badgeType === BadgeTypes.HOBBIES_INTERESTS) {
      setHobbiesBadges((hobbiesBadges) =>
        hobbiesBadges.filter((bge) => bge.badge.badgeId !== chip.badge.badgeId)
      );
    } else if (chip.badge.badgeType === BadgeTypes.SUBJECT_MATTER_EXPERT) {
      setSmeBadges((smeBadges) =>
        smeBadges.filter((bge) => bge.badge.badgeId !== chip.badge.badgeId)
      );
    }

    refetch();
  };
  return (
    <Box>
      {isBadgesReady ? (
        <>
          <InfoBlock>
            <Box m={2}>
              <Typography variant={"body2"}>
                Click on the X on the badge to remove it from your profile.
                <br />
                <strong>
                  Once you click on the X, it'll instantly be removed.
                </strong>
              </Typography>
            </Box>
          </InfoBlock>

          <Box m={2}>
            <Box className={classes.badgeTitleBox}>
              <Typography>Hobbies/Interests Badges</Typography>
              <Typography variant={"subtitle1"}>
                Total: {hobbiesBadges?.length}
              </Typography>
            </Box>
            {hobbiesBadges?.length > 0 && (
              <ColorBorderBox height={125}>
                {hobbiesBadges?.map((bge) => (
                  <BadgeChip
                    key={bge.badge?.id}
                    id={bge.badge?.id}
                    label={bge.badge?.badgeName}
                    image={bge.badge?.badgeIcon?.badgeIconImg}
                    onDelete={() => handleDelete(bge)}
                  />
                ))}
              </ColorBorderBox>
            )}
          </Box>

          <Box m={2}>
            <Box className={classes.badgeTitleBox}>
              <Typography>Subject Matter Expert Badges</Typography>
              <Typography variant={"subtitle1"}>
                Total: {smeBadges?.length}
              </Typography>
            </Box>
            {smeBadges?.length > 0 && (
              <ColorBorderBox height={125}>
                {smeBadges?.map((bge) => (
                  <BadgeChip
                    key={bge.badge?.id}
                    id={bge.badge?.id}
                    label={bge.badge?.badgeName}
                    image={bge.badge?.badgeIcon?.badgeIconImg}
                    onDelete={() => handleDelete(bge)}
                  />
                ))}
              </ColorBorderBox>
            )}
          </Box>
        </>
      ) : (
        <LoadingCircle text={"Loading badges..."} />
      )}
    </Box>
  );
};

export default memo(EditBadgesTab);
