import React, { memo } from "react";
import { Switch } from "react-router-dom";
import SecureRoute from "../../components/routes/SecureRoute";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import ThirdPartyDirectoryContent from "./ThirdPartyDirectoryContent";
import ThirdPartyProfile from "./ThirdPartyProfile/ThirdPartyProfile";

const ThirdPartyDirectoryPage = () => {
  return (
      <Switch>
        <SecureRoute exact path={FrontendRoutes.THIRD_PARTY_DIRECTORY_PROFILE()}>
          <ThirdPartyProfile/>
        </SecureRoute>

        <SecureRoute exact path={FrontendRoutes.THIRD_PARTY_DIRECTORY}>
          <ThirdPartyDirectoryContent/>
        </SecureRoute>
      </Switch>
  );
};

export default memo(ThirdPartyDirectoryPage);
