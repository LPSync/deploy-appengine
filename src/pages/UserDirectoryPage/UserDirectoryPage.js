import React, { memo } from "react";
import UserDirectoryPageContent from "./UserDirectoryPageContent";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import UserProfile from "./UserProfile";
import { Switch } from "react-router-dom";
import SecureRoute from "../../components/routes/SecureRoute";

const UserDirectoryPage = () => {
  return (
    <Switch>
      <SecureRoute exact path={FrontendRoutes.USER_DIRECTORY_PROFILE()}>
        <UserProfile />
      </SecureRoute>

      <SecureRoute exact path={FrontendRoutes.USER_DIRECTORY}>
        <UserDirectoryPageContent />
      </SecureRoute>
    </Switch>
  );
};

export default memo(UserDirectoryPage);
