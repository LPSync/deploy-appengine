import React, { useState, useEffect, useContext, memo } from "react";
import { Redirect } from "react-router-dom";
import { AuthUserContext } from "../../AuthUserContextProvider";
import LoadingCircle from "../../components/circularProgress/LoadingCircle";
import FrontendRoutes from "../../data/constants/FrontendRoutes";

const HomePage = () => {
  const { permDashboardView, permUserDirectoryView } = useContext(
    AuthUserContext,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!permDashboardView || !permUserDirectoryView) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [permDashboardView, permUserDirectoryView, isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingCircle/>
      ) : (
        <>
          {permDashboardView ? (
            <Redirect to={FrontendRoutes.USER_DIRECTORY}/>
          ) : (
            <Redirect to={FrontendRoutes.USER_DIRECTORY}/>
          )}
        </>
      )}
    </>
  );
};

export default memo(HomePage);
