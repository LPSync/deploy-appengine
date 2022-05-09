import React, { memo } from "react";
import UserManagerIcon from "./UserManagerIcon";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import UserBadgeChip from "../UserBadgeChip";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
}));

const UserManagerOrICBadge = ({ isManager }) => {
  const classes = useStyles();
  return (
    <UserBadgeChip
      tooltipTitle={isManager ? "Manager" : "Individual Contributor"}
      icon={isManager
        ? <span className={classes.iconWrapper}>
          <UserManagerIcon style={{ width: 32, height: 32 }} />
      </span>
        :
        <span className={classes.iconWrapper}>
          <WorkOutlineIcon fontSize="large" style={{ width: 32, height: 32 }} />
        </span>

      }
    />
  );
};

export default memo(UserManagerOrICBadge);