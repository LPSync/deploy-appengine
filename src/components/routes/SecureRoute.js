import React, {memo, useContext} from "react";
import {Route, useHistory} from "react-router-dom";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import {AuthUserContext} from "../../AuthUserContextProvider";

const SecureRoute = ({adminOnly, children, ...props}) => {
  const {
    permSysMgmtSettingsOffboarding,
    permSysMgmtLogs,
    permSysMgmtManage,
    permSysMgmtSettingsOnboarding,
    permSysMgmtBadgeMgmt,
    permSysMgmtCandidatePortalAccess,
    permSysMgmtSchedulerJobs,
    permSysMgmtFteCandidateTracker,
    permSystemsAndServicesView,
    authUser,
  } = useContext(AuthUserContext);
  const history = useHistory();

  if (!authUser) {
    return null;
  }

  if (
    adminOnly &&
    !(
      permSysMgmtSettingsOffboarding ||
      permSysMgmtLogs ||
      permSysMgmtManage ||
      permSysMgmtSettingsOnboarding ||
      permSysMgmtBadgeMgmt ||
      permSysMgmtCandidatePortalAccess ||
      permSysMgmtSchedulerJobs ||
      permSysMgmtFteCandidateTracker ||
      permSystemsAndServicesView
    )
  ) {
    history.push(FrontendRoutes.HOME);
  }

  return <Route {...props}>{children}</Route>;
};

export default memo(SecureRoute);
