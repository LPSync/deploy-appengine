import React, {useState, useEffect, useContext, memo} from "react";
import {Redirect} from "react-router-dom";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import FrontendRoutes, {
  AdminRoutes,
} from "../../../data/constants/FrontendRoutes";

const HomePage = () => {
  const {
    permSysMgmtManage,
    permSysMgmtFteCandidateTracker,
    permSysMgmtSettingsOffboarding,
  } = useContext(AuthUserContext);

  const [redirectLink, setRedirectLink] = useState("");

  useEffect(() => {
    if (permSysMgmtManage) {
      setRedirectLink(AdminRoutes.ADMIN_USER_MANAGEMENT);
    } else if (permSysMgmtFteCandidateTracker) {
      setRedirectLink(AdminRoutes.ADMIN_FTE_CANDIDATE_TRACKER);
    } else if (permSysMgmtSettingsOffboarding) {
      setRedirectLink(AdminRoutes.ADMIN_OFFBOARDING_SETTINGS);
    } else {
      setRedirectLink(FrontendRoutes.HOME);
    }
  }, [
    redirectLink,
    permSysMgmtManage,
    permSysMgmtFteCandidateTracker,
    permSysMgmtSettingsOffboarding,
  ]);

  return (
    <>
      {!redirectLink ? (
        <LoadingCircle />
      ) : (
        <>
          <Redirect to={redirectLink} />
        </>
      )}
    </>
  );
};

export default memo(HomePage);
