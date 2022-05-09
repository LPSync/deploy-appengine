import React, { memo } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import UserBadgeChip from "../UserBadgeChip";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
  goldStar: {
    color: "#FFD700",
  },
  goldStarText: {
  },
  silverStar: {
    color: "#C0C0C0",
  },
  silverStarText: {
  },
  bronzeStar: {
    color: "#cd7f32",
  },
  bronzeStarText: {
  },
  count: {
    color: "#1d1f52",
    position: "absolute",
    fontSize: "0.825rem",
    top: "0.75rem",
  },
});

const getTenureToolTip = (tenureYears) => {
  if (tenureYears < 1)
    return "Newbie, Welcome!";
  if (tenureYears === 5)
    return `Half a Decade LPer!`;
  if (tenureYears < 10)
    return `${tenureYears} Year LPer`;
  if (tenureYears >= 10)
    return `Decade or more LPer!`;
};

const getClasses = (classes, tenureYears) => {
  if (tenureYears < 5) {
    return [classes.bronzeStar, classes.bronzeStarText];
  }
  if (tenureYears < 10) {
    return [classes.silverStar, classes.silverStarText];
  }
  if (tenureYears >= 10) {
    return [classes.goldStar, classes.goldStarText];
  }
};

const UserStarBadge = ({ tenureYears }) => {
  const classes = useStyles();
  const [starClasses, starTextClasses] = getClasses(classes, tenureYears);

  return (
    <UserBadgeChip
      tooltipTitle={getTenureToolTip(tenureYears)}
      icon={
        <div className={classes.root}>
          <StarIcon fontSize="large" className={starClasses} />

          {tenureYears > 0 && (
            <Typography component="span" className={`${starTextClasses} ${classes.count}`}>
              {tenureYears}
            </Typography>
          )}
        </div>
      }
    />
  );
};

export default memo(UserStarBadge);