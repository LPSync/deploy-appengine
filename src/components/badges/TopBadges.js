import React, {memo} from "react";
import BadgeIcon from "./BadgeIcon";
import {Box, makeStyles} from "@material-ui/core";
import {BadgeImages, badgesUrl} from "../../data/constants/BadgeTypes";

const useStyles = makeStyles((theme) => ({
  badgesHoveredBox: {
    display: "flex",
    justifyContent: "space-evenly",
    background: "#AFB3C0",
    borderRadius: 5,
    minWidth: 142.5,
    textAlign: "center",
  },
}));

const TopBadges = ({badgesTypes, light, handleHover, ...props}) => {
  const classes = useStyles({light});
  return (
    <Box py={0.25} className={classes.badgesHoveredBox} {...props}>
      {badgesTypes?.map(
        (badgeType) =>
          BadgeImages?.[badgeType] && (
            <BadgeIcon
              key={badgeType}
              image={`${badgesUrl}${BadgeImages?.[badgeType]}`}
              onMouseOver={() => handleHover(badgeType)}
            />
          )
      )}
    </Box>
  );
};

export default memo(TopBadges);
