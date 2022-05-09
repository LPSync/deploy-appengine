import React, {useState, useContext, useEffect, memo} from "react";
import {connect} from "react-redux";
import {List} from "@material-ui/core";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import NavListItem from "../../../components/list/NavListItem";
import NavListSubheader from "../../../components/list/NavListSubheader";
import {setOrgChartEmail} from "../../../data/redux/common/commonActions";
import CustomIcon from "../../../components/CustomIcon";

const NavItems = ({setOrgChartEmail}) => {
  const {
    permOffboardingAll,
    permOffboardingTeam,
    permOffboardingNfte,
    permOnboardingAll,
    permOnboardingTeam,
    permOrgChartView,
    permReportGeneratorView,
    permReportingDashboardView,
    permReportNonFteAudit,
    permRequisitionAll,
    permSysMgmtLogs,
    permSysMgmtManage,
    permSysMgmtSettingsOffboarding,
    permTaskManagerViewAll,
    permTaskManagerViewTeam,
    permUserDirectoryView,
    permThirdPartyDirectoryView,
    permMultiCandidateRequestView,
    permSysMgmtSettingsOnboarding,
    permSysMgmtFteCandidateTracker,
    permSysMgmtBadgeMgmt,
    permSysMgmtCandidatePortalAccess,
    permSysMgmtSchedulerJobs,
    permSystemsAndServicesView,
  } = useContext(AuthUserContext);
  const [viewCompany, setViewCompany] = useState(false);
  const [viewSystemTools, setViewSystemTools] = useState(false);
  const [viewReports, setViewReports] = useState(false);
  const [viewAdminTools, setViewAdminTools] = useState(false);
  useEffect(() => {
    if (
      permOrgChartView ||
      permUserDirectoryView ||
      permThirdPartyDirectoryView
    ) {
      setViewCompany(true);
    }

    if (
      permOnboardingAll ||
      permOnboardingTeam ||
      permRequisitionAll ||
      permOffboardingAll ||
      permOffboardingTeam ||
      permOffboardingNfte ||
      permMultiCandidateRequestView ||
      permTaskManagerViewAll ||
      permTaskManagerViewTeam
    ) {
      setViewAdminTools(true);
    }

    if (
      permSysMgmtLogs ||
      permSysMgmtManage ||
      permSysMgmtSettingsOffboarding ||
      permSysMgmtSettingsOnboarding ||
      permSysMgmtFteCandidateTracker ||
      permSysMgmtBadgeMgmt ||
      permSysMgmtCandidatePortalAccess ||
      permSysMgmtSchedulerJobs
    ) {
      setViewSystemTools(true);
    }

    if (
      permReportNonFteAudit ||
      permReportingDashboardView ||
      permReportGeneratorView
    ) {
      setViewReports(true);
    }
  }, [
    permOffboardingAll,
    permOffboardingTeam,
    permOffboardingNfte,
    permOnboardingAll,
    permOnboardingTeam,
    permOrgChartView,
    permReportGeneratorView,
    permReportingDashboardView,
    permReportNonFteAudit,
    permRequisitionAll,
    permSysMgmtLogs,
    permSysMgmtManage,
    permSysMgmtSettingsOffboarding,
    permTaskManagerViewAll,
    permTaskManagerViewTeam,
    permUserDirectoryView,
    permThirdPartyDirectoryView,
    permMultiCandidateRequestView,
    permSysMgmtSettingsOnboarding,
    permSysMgmtFteCandidateTracker,
    permSysMgmtBadgeMgmt,
    permSysMgmtCandidatePortalAccess,
    permSysMgmtSchedulerJobs,
  ]);

  return (
    <>
      {viewCompany && (
        <>
          <NavListSubheader>COMPANY</NavListSubheader>
          {permOrgChartView && (
            <NavListItem
              onClick={() => setOrgChartEmail("")}
              to={FrontendRoutes.ORGANIZATION_CHART}
              icon={
                <CustomIcon
                  alt="org-chart-icon"
                  src={"/images/hierarchy-streamline.png"}
                />
              }
              text="Organization Chart"
            />
          )}
          {permUserDirectoryView && (
            <NavListItem
              to={FrontendRoutes.USER_DIRECTORY}
              icon={
                <CustomIcon
                  alt="user-directory-icon"
                  src={"/images/multiple-neutral-streamline.png"}
                />
              }
              text="User Directory"
            />
          )}
          {permThirdPartyDirectoryView && (
            <NavListItem
              to={FrontendRoutes.THIRD_PARTY_DIRECTORY}
              icon={
                <CustomIcon
                  alt="third-party-directory-icon"
                  src={"/images/shop-streamline.png"}
                />
              }
              text="Third Party Directory"
            />
          )}
          {permSystemsAndServicesView && (
            <NavListItem
              to={FrontendRoutes.SERVICE_AND_SYSTEM_DIRECTORY}
              icon={
                <CustomIcon
                  alt="service-system-directory-icon"
                  src={"/images/workflow-data-table-cog-streamline.png"}
                />
              }
              text="Service & System Directory"
            />
          )}
        </>
      )}
      {viewAdminTools && (
        <>
          <NavListSubheader>ADMIN TOOLS</NavListSubheader>
          {(permOnboardingAll || permOnboardingTeam || permRequisitionAll) && (
            <NavListItem
              to={FrontendRoutes.ONBOARDING_DASHBOARD}
              icon={
                <CustomIcon
                  alt="onboarding-dashboard-icon"
                  src={"/images/layout-dashboard-streamline.png"}
                />
              }
              text="Onboarding Dashboard"
            />
          )}
          {permRequisitionAll && (
            <>
              <NavListItem
                to={FrontendRoutes.REQUISITION_REQUEST}
                icon={
                  <CustomIcon
                    alt="requisition-request-icon"
                    src={"/images/task-checklist-add-streamline.png"}
                  />
                }
                text="Requisition Request"
              />
            </>
          )}
          {(permOnboardingAll || permOnboardingTeam) && (
            <NavListItem
              to={FrontendRoutes.CANDIDATE_REQUEST}
              icon={
                <CustomIcon
                  alt="candidate-request-icon"
                  src={"/images/single-neutral-actions-add-streamline.png"}
                />
              }
              text="Candidate Request"
            />
          )}
          {permMultiCandidateRequestView && (
            <NavListItem
              to={FrontendRoutes.MULTI_CANDIDATE_REQUEST}
              icon={
                <CustomIcon
                  alt="multi-candidate-request-icon"
                  src={"/images/multiple-actions-add-streamline.png"}
                />
              }
              text="Multi-Candidate Request"
            />
          )}
          {(permOffboardingAll ||
            permOffboardingTeam ||
            permOffboardingNfte) && (
            <NavListItem
              to={FrontendRoutes.OFFBOARD_EMPLOYEE}
              icon={
                <CustomIcon
                  alt="offboard-employee-icon"
                  src={"/images/single-neutral-actions-subtract-streamline.png"}
                />
              }
              text="Offboard Employee"
            />
          )}
          {(permTaskManagerViewAll || permTaskManagerViewTeam) && (
            <NavListItem
              to={FrontendRoutes.TASK_MANAGER}
              icon={
                <CustomIcon
                  alt="task-manager-icon"
                  src={"/images/task-list-approve-streamline.png"}
                />
              }
              text="Task Manager"
            />
          )}
        </>
      )}

      {viewReports && (
        <>
          <NavListSubheader>REPORTS</NavListSubheader>
          <List>
            {permReportNonFteAudit && (
              <NavListItem
                to={FrontendRoutes.NON_FTE_AUDIT_REPORT}
                text="Non-FTE Audit Report"
              />
            )}
            {permReportingDashboardView && (
              <NavListItem
                to={FrontendRoutes.REPORTING_DASHBOARD}
                text="Reporting Dashboard"
              />
            )}
            {permReportGeneratorView && (
              <NavListItem
                to={FrontendRoutes.REPORT_GENERATOR}
                text="Report Generator"
              />
            )}
          </List>
        </>
      )}
      {viewSystemTools && (
        <>
          <NavListSubheader>SYSTEM TOOLS</NavListSubheader>
          <List>
            <NavListItem to="/admin" text="Admin" />
          </List>
        </>
      )}
    </>
  );
};

export default connect(() => ({}), {setOrgChartEmail})(memo(NavItems));
