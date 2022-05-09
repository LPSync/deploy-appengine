import React, {memo} from "react";
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userSubtitle: {
    color: theme.palette.warning.main,
    fontWeight: "bold",
  },
  userText: {
    marginBottom: theme.spacing(1),
  },
}));

const ProfileTypography = ({subtitle, text}) => {
  const classes = useStyles();
  return (
    <>
      {subtitle && (
        <Typography
          component={"div"}
          variant="subtitle1"
          className={classes.userSubtitle}
        >
          {subtitle}
        </Typography>
      )}

      <Typography
        component={"div"}
        gutterBottom
        variant="body2"
        className={classes.userText}
      >
        {text ? text : "-"}
      </Typography>
    </>
  );
};

export default memo(ProfileTypography);
