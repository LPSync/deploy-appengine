import React, {memo} from "react";
import SecureRoute from "../../components/routes/SecureRoute";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import {Switch} from "react-router-dom";
import ServiceComponent from "./ServiceComponent/ServiceComponent";
import ServiceAndSystemDirectoryContent from "./ServiceAndSystemDirectoryContent";

const ServiceAndSystemDirectoryPage = () => {
  return (
    <Switch>
      <SecureRoute
        exact
        path={FrontendRoutes.SERVICE_AND_SYSTEM_DIRECTORY_SERVICE}
      >
        <ServiceComponent />
      </SecureRoute>

      <SecureRoute exact path={FrontendRoutes.SERVICE_AND_SYSTEM_DIRECTORY}>
        <ServiceAndSystemDirectoryContent />
      </SecureRoute>
    </Switch>
  );
};

export default memo(ServiceAndSystemDirectoryPage);
