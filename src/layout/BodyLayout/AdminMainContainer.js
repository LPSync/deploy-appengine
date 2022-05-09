import React, {memo} from "react";
import {Switch, useLocation} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import HomePage from "../../pages/adminPages/HomePage";
import SystemLogsPage from "../../pages/adminPages/SystemLogsPage";
import UserManagementPage from "../../pages/adminPages/UserManagementPage";
import UserBadgeManagementPage from "../../pages/adminPages/UserBadgeManagementPage";
import ScrollToTop from "../../components/ScrollToTop";
import {AdminRoutes} from "../../data/constants/FrontendRoutes";
import OffboardingSettingsPage from "../../pages/adminPages/OffboardingSettingsPage";
import SecureRoute from "../../components/routes/SecureRoute";
import OnboardingSettingsPage from "../../pages/adminPages/OnboardingSettingsPage";
import SchedulerJobsPage from "../../pages/adminPages/SchedulerJobsPage/SchedulerJobsPage";
import FteCandidateTrackerPage from "../../pages/adminPages/FteCandidateTrackerPage/FteCandidateTrackerPage";
import CandidatePortalSettingsPage from "../../pages/adminPages/CandidatePortalSettingsPage";

const AdminMainContainer = () => {
  const location = useLocation().pathname.split("/");
  const currentKey = (location[2] && "/admin/" + location[2]) || "/admin";

  return (
    <div>
      <TransitionGroup>
        <CSSTransition key={currentKey} classNames="fade" timeout={300} appear>
          <section>
            <ScrollToTop />
            <Switch>
              <SecureRoute
                exact
                path={AdminRoutes.ADMIN}
                component={HomePage}
                adminOnly
              />
              <SecureRoute
                path={AdminRoutes.ADMIN_OFFBOARDING_SETTINGS}
                adminOnly
              >
                <OffboardingSettingsPage />
              </SecureRoute>
              <SecureRoute
                path={AdminRoutes.ADMIN_ONBOARDING_SETTINGS}
                adminOnly
              >
                <OnboardingSettingsPage />
              </SecureRoute>
              <SecureRoute
                path={AdminRoutes.ADMIN_SYSTEM_LOGS}
                component={SystemLogsPage}
                adminOnly
              />
              <SecureRoute
                path={AdminRoutes.ADMIN_USER_MANAGEMENT}
                component={UserManagementPage}
                adminOnly
              />
              <SecureRoute
                path={AdminRoutes.ADMIN_USER_BADGING_MANAGEMENT}
                component={UserBadgeManagementPage}
                adminOnly
              />
              <SecureRoute
                path={AdminRoutes.ADMIN_SCHEDULER_JOBS}
                component={SchedulerJobsPage}
                adminOnly
              />
              <SecureRoute
                path={AdminRoutes.ADMIN_CANDIDATE_PORTAL}
                component={CandidatePortalSettingsPage}
                adminOnly
              />
              <SecureRoute
                exact
                path={AdminRoutes.ADMIN_FTE_CANDIDATE_TRACKER}
                component={FteCandidateTrackerPage}
                adminOnly
              />
              <SecureRoute
                path={AdminRoutes.ADMIN_FTE_CANDIDATE_TRACKER_USERNAME}
                component={FteCandidateTrackerPage}
                adminOnly
              />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default memo(AdminMainContainer);
