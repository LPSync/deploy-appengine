import React, {memo, useMemo} from "react";
import {useHistory} from "react-router-dom";
import UserImg from "../../../components/UserImg";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import UserProfileLink from "../../../components/UserProfileLink";
import {getProfileName} from "../../../data/helper/helpers";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  employeeInfoContent: {
    display: "flex",
    flexDirection: "column",
  },
}));

const UserSearchInfoCell = ({profile}) => {
  const history = useHistory();
  const classes = useStyles();

  const username = useMemo(
    () => profile?.username || profile?.email?.split("@")?.[0],
    [profile]
  );
  return (
    <>
      <UserImg
        small
        email={profile?.email}
        onClick={() =>
          history.push(FrontendRoutes.USER_DIRECTORY_PROFILE(username))
        }
      />
      <div className={classes.employeeInfoContent}>
        <UserProfileLink name={getProfileName(profile)} username={username} />
        {profile?.jobTitle}
      </div>
    </>
  );
};

export default memo(UserSearchInfoCell);
