import React, {memo} from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "../../index.css";
import NonFteAuditReportPage from "../../pages/NonFteAuditReportPage";
import ConsolidatedReportPage from "../../pages/ConsolidatedReportPage";
import DashboardPage from "../../pages/DashboardPage";
import HomePage from "../../pages/HomePage";
// import OffboardEmployeePage from "../../pages/OffboardEmployeePage";
import OffboardRequestPage from "../../pages/OffboardRequestPage";
import OnboardingDashboardPage from "../../pages/OnboardingDashboardPage";
import OrganizationChartPage from "../../pages/OrganizationChartPage";
import RequisitionRequestPage from "../../pages/RequisitionRequestPage";
import SystemStatusPage from "../../pages/SystemStatusPage";
import ReportGenerator from "../../pages/ReportGenerator";
import TaskManagerPage from "../../pages/TaskManagerPage";
import ReportingDashboardPage from "../../pages/ReportingDashboardPage";
import UserDirectoryPage from "../../pages/UserDirectoryPage";
import ThirdPartyDirectoryPage from "../../pages/ThirdPartyDirectoryPage";
import ScrollToTop from "../../components/ScrollToTop";
import FrontendRoutes, {AdminRoutes} from "../../data/constants/FrontendRoutes";
import CandidateRequestPage from "../../pages/CandidateRequestPage";
import AdminMainContainer from "./AdminMainContainer";
import LoginCallback from "../../components/routes/LoginCallback";
import SecureRoute from "../../components/routes/SecureRoute";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import MultiCandidateRequestPage from "../../pages/MultiCandidateRequestPage";
import useNotifier from "../../components/snackbars/useNotifier";
import ServiceAndSystemDirectoryPage from "../../pages/ServiceAndSystemDirectoryPage/ServiceAndSystemDirectoryPage";
import GlobalSearchPage from "../../pages/GlobalSearchPage/GlobalSeachPage";

const MainContainer = () => {
  const location = useLocation();
  const currentKey = location?.pathname?.split("/")[1] || "/";
  useNotifier();

  return (
    <TransitionGroup>
      <CSSTransition key={currentKey} classNames="fade" timeout={300} appear>
        <>
          <ScrollToTop />
          <Switch>
            <Route exact path={FrontendRoutes.HOME} component={HomePage} />
            <Route
              exact
              path={FrontendRoutes.LOGIN_CALLBACK}
              component={LoginCallback}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.NON_FTE_AUDIT_REPORT}
              component={NonFteAuditReportPage}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.REPORTING_DASHBOARD}
              component={ReportingDashboardPage}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.REPORT_GENERATOR}
              component={ReportGenerator}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.CONSOLIDATED_REPORT}
              component={ConsolidatedReportPage}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.DASHBOARD}
              component={DashboardPage}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.ORGANIZATION_CHART}
              component={OrganizationChartPage}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.CANDIDATE_REQUEST}
              component={CandidateRequestPage}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.MULTI_CANDIDATE_REQUEST}
              component={MultiCandidateRequestPage}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.OFFBOARD_EMPLOYEE}
              component={OffboardRequestPage}
            />
            <SecureRoute
              path={FrontendRoutes.ONBOARDING_DASHBOARD}
              component={OnboardingDashboardPage}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.REQUISITION_REQUEST}
              component={RequisitionRequestPage}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.SYSTEM_STATUS}
              component={SystemStatusPage}
            />
            <SecureRoute
              path={FrontendRoutes.TASK_MANAGER}
              component={TaskManagerPage}
            />
            <SecureRoute
              path={FrontendRoutes.USER_DIRECTORY}
              component={UserDirectoryPage}
            />
            <SecureRoute
              path={FrontendRoutes.SERVICE_AND_SYSTEM_DIRECTORY}
              component={ServiceAndSystemDirectoryPage}
            />
            <SecureRoute
              exact
              path={FrontendRoutes.GLOBAL_SEARCH}
              component={GlobalSearchPage}
            />
            <SecureRoute
              adminOnly
              path={AdminRoutes.ADMIN}
              component={AdminMainContainer}
            />
            <SecureRoute
              path={FrontendRoutes.THIRD_PARTY_DIRECTORY}
              component={ThirdPartyDirectoryPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default memo(MainContainer);
