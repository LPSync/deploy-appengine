import React, {memo} from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";
import UserTypography from "./UserTypography";
import UserCard from "./UserCard";
import UserLoadingCircle from "./UserLoadingCircle";

const useStyles = makeStyles((theme) => ({
  userTeamItem: {
    display: "flex",
    flexDirection: "column",
    width: 260,
    alignItems: "center",
    margin: "0 10px 20px",
    [theme.breakpoints.up("lg")]: {
      margin: "0 15px 30px",
    },
  },
  notDefinedText: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const UserGridItemWrapper = ({user, title, noUserText, loading, ...props}) => {
  const classes = useStyles();

  return (
    <Box className={classes.userTeamItem} {...props}>
      {loading ? (
        <UserLoadingCircle />
      ) : !user ? (
        <Typography className={classes.notDefinedText} variant="h6">
          {noUserText || "No user Defined"}
        </Typography>
      ) : (
        <>
          {title && <UserTypography title={title} />}
          <UserCard profile={user?.profile} />
        </>
      )}
    </Box>
  );
};

export default memo(UserGridItemWrapper);
