import {useContext, useEffect} from "react";
import {AuthUserContext} from "../AuthUserContextProvider";

const usePermissions = () => {
  const {
    authUserPermissions,
    setIsPageLoading,
    setPermDashboardView,
    setMultiCandidateRequestView,
    setPermBadgeRequestApproveTasks,
    setPermBadgeRequestCancelTasks,
    setPermBadgeRequestRejectTasks,
    setPermOffboardingAll,
    setPermOffboardingTeam,
    setPermOffboardingNfte,
    setPermOffboardingApproveTasks,
    setPermOffboardingCancelTasks,
    setPermOffboardingHrInfo,
    setPermOffboardingRejectTasks,
    setPermOnboardingAll,
    setPermOnboardingApprovalBypass,
    setPermOnboardingApproveTasks,
    setPermOnboardingCancelTasks,
    setPermOnboardingRejectTasks,
    setPermOnboardingRequisitionBypass,
    setPermOnboardingTeam,
    setPermOnboardingDashboardView,
    setPermOffboardingApprovalBypass,
    setPermOrgChartView,
    setPermReportGeneratorView,
    setPermReportingDashboardView,
    setPermReportNonFteAudit,
    setPermRequisitionAll,
    setPermRequisitionApproveTasks,
    setPermRequisitionRejectTasks,
    setPermRequisitionCancelTasks,
    setPermSysMgmtBadgeMgmt,
    setPermSysMgmtCandidatePortalAccess,
    setPermSysMgmtFteCandidateTracker,
    setPermSystemsAndServicesView,
    setPermSysMgmtLogs,
    setPermSysMgmtManage,
    setPermSysMgmtSchedulerJobs,
    setPermSysMgmtSettingsOffboarding,
    setPermSysMgmtSettingsOnboarding,
    setPermTaskManagerViewAll,
    setPermTaskManagerViewAllOffboarding,
    setPermTaskManagerViewAllOnboarding,
    setPermTaskManagerViewAllRequisition,
    setPermTaskManagerViewTeam,
    setPermTaskManagerViewHrInfo,
    setPermUserDirectoryFinanceView,
    setPermUserDirectoryItDetailsView,
    setPermUserDirectoryLpsyncManage,
    setPermUserDirectoryNonFteAudit,
    setPermUserDirectoryOrgDetailsView,
    setPermUserDirectoryView,
    setPermThirdPartyDirectoryView,
    setPermBulkApproverOnboarding,
    setPermBulkApproverRequisition,
    setPermBulkApproverOffboarding,
  } = useContext(AuthUserContext);

  useEffect(() => {
    if (authUserPermissions?.length) {
      authUserPermissions?.forEach((id) => {
        switch(id) {
          case "dashboard-view":
            setPermDashboardView(true);
            break;
          case "multicandidaterequest-view":
            setMultiCandidateRequestView(true);
            break;
          case "badge-request-approve-tasks":
            setPermBadgeRequestApproveTasks(true);
            break;
          case "badge-request-cancel-tasks":
            setPermBadgeRequestCancelTasks(true);
            break;
          case "badge-request-reject-tasks":
            setPermBadgeRequestRejectTasks(true);
            break;
          case "offboarding-all":
            setPermOffboardingAll(true);
            break;
          case "offboarding-team":
            setPermOffboardingTeam(true);
            break;
          case "offboarding-nfte":
            setPermOffboardingNfte(true);
            break;
          case "offboarding-approval-bypass":
            setPermOffboardingApprovalBypass(true);
            break;
          case "offboarding-approve-tasks":
            setPermOffboardingApproveTasks(true);
            break;
          case "offboarding-cancel-tasks":
            setPermOffboardingCancelTasks(true);
            break;
          case "offboarding-hrinfo":
            setPermOffboardingHrInfo(true);
            break;
          case "offboarding-reject-tasks":
            setPermOffboardingRejectTasks(true);
            break;
          case "onboarding-all":
            setPermOnboardingAll(true);
            break;
          case "onboarding-approval-bypass":
            setPermOnboardingApprovalBypass(true);
            break;
          case "onboarding-approve-tasks":
            setPermOnboardingApproveTasks(true);
            break;
          case "onboarding-cancel-tasks":
            setPermOnboardingCancelTasks(true);
            break;
          case "onboarding-reject-tasks":
            setPermOnboardingRejectTasks(true);
            break;
          case "onboarding-requisition-bypass":
            setPermOnboardingRequisitionBypass(true);
            break;
          case "onboarding-team":
            setPermOnboardingTeam(true);
            break;
          case "onboardingdashboard-view":
            setPermOnboardingDashboardView(true);
            break;
          case "orgchart-view":
            setPermOrgChartView(true);
            break;
          case "reportgenerator-view":
            setPermReportGeneratorView(true);
            break;
          case "reportingdashboard-view":
            setPermReportingDashboardView(true);
            break;
          case "reporting-report-nonfteaudit":
            setPermReportNonFteAudit(true);
            break;
          case "requisition-all":
            setPermRequisitionAll(true);
            break;
          case "requisition-approve-tasks":
            setPermRequisitionApproveTasks(true);
            break;
          case "requisition-reject-tasks":
            setPermRequisitionRejectTasks(true);
            break;
          case "requisition-cancel-tasks":
            setPermRequisitionCancelTasks(true);
            break;
          case "systemmanagement-badge-mgmt":
            setPermSysMgmtBadgeMgmt(true);
            break;
          case "systemmanagement-candidate-portal-access":
            setPermSysMgmtCandidatePortalAccess(true);
            break;
          case "systemmanagement-fte-candidate-tracker":
            setPermSysMgmtFteCandidateTracker(true);
            break;
          case "systems-and-services-view":
            setPermSystemsAndServicesView(true);
            break;

          case "systemmanagement-logs":
            setPermSysMgmtLogs(true);
            break;
          case "systemmanagement-manage":
            setPermSysMgmtManage(true);
            break;
          case "systemmanagement-schedulerjobs":
            setPermSysMgmtSchedulerJobs(true);
            break;
          case "systemmanagement-settings-offboarding":
            setPermSysMgmtSettingsOffboarding(true);
            break;
          case "systemmanagement-settings-onboarding":
            setPermSysMgmtSettingsOnboarding(true);
            break;
          case "taskmanager-view-all":
            setPermTaskManagerViewAll(true);
            break;
          case "taskmanager-view-all-offboarding":
            setPermTaskManagerViewAllOffboarding(true);
            break;
          case "taskmanager-view-all-onboarding":
            setPermTaskManagerViewAllOnboarding(true);
            break;
          case "taskmanager-view-all-requisition":
            setPermTaskManagerViewAllRequisition(true);
            break;
          case "taskmanager-view-team":
            setPermTaskManagerViewTeam(true);
            break;
          case "taskmanager-view-hrinfo":
            setPermTaskManagerViewHrInfo(true);
            break;
          case "userdirectory-finance-view":
            setPermUserDirectoryFinanceView(true);
            break;
          case "userdirectory-itdetails-view":
            setPermUserDirectoryItDetailsView(true);
            break;
          case "userdirectory-lpsync-manage":
            setPermUserDirectoryLpsyncManage(true);
            break;
          case "userdirectory-nonfteaudit":
            setPermUserDirectoryNonFteAudit(true);
            break;
          case "userdirectory-orgdetails-view":
            setPermUserDirectoryOrgDetailsView(true);
            break;
          case "userdirectory-view":
            setPermUserDirectoryView(true);
            break;
          case "vendordirectory-view":
            setPermThirdPartyDirectoryView(true);
            break;
          case "bulk-approver-onboarding":
            setPermBulkApproverOnboarding(true);
            break;
          case "bulk-approver-requisition":
            setPermBulkApproverRequisition(true);
            break;
          case "bulk-approver-offboarding":
            setPermBulkApproverOffboarding(true);
            break;
          default:
            break;
        }
      });
      setIsPageLoading(false);
    }
  }, [authUserPermissions,
    setIsPageLoading, setMultiCandidateRequestView, setPermBadgeRequestApproveTasks,
    setPermBadgeRequestCancelTasks, setPermBadgeRequestRejectTasks, setPermBulkApproverOffboarding,
    setPermBulkApproverOnboarding, setPermBulkApproverRequisition, setPermDashboardView,
    setPermOffboardingAll, setPermOffboardingApprovalBypass, setPermOffboardingApproveTasks,
    setPermOffboardingCancelTasks, setPermOffboardingHrInfo, setPermOffboardingNfte,
    setPermOffboardingRejectTasks, setPermOffboardingTeam, setPermOnboardingAll,
    setPermOnboardingApprovalBypass, setPermOnboardingApproveTasks, setPermOnboardingCancelTasks,
    setPermOnboardingDashboardView, setPermOnboardingRejectTasks, setPermOnboardingRequisitionBypass,
    setPermOnboardingTeam, setPermOrgChartView, setPermReportGeneratorView, setPermReportNonFteAudit,
    setPermReportingDashboardView, setPermRequisitionAll, setPermRequisitionApproveTasks,
    setPermRequisitionCancelTasks, setPermRequisitionRejectTasks, setPermSysMgmtBadgeMgmt,
    setPermSysMgmtCandidatePortalAccess, setPermSysMgmtFteCandidateTracker, setPermSysMgmtLogs,
    setPermSysMgmtManage, setPermSysMgmtSchedulerJobs, setPermSysMgmtSettingsOffboarding,
    setPermSysMgmtSettingsOnboarding, setPermSystemsAndServicesView, setPermTaskManagerViewAll,
    setPermTaskManagerViewAllOffboarding, setPermTaskManagerViewAllOnboarding, setPermTaskManagerViewAllRequisition,
    setPermTaskManagerViewHrInfo, setPermTaskManagerViewTeam, setPermThirdPartyDirectoryView,
    setPermUserDirectoryFinanceView, setPermUserDirectoryItDetailsView, setPermUserDirectoryLpsyncManage,
    setPermUserDirectoryNonFteAudit, setPermUserDirectoryOrgDetailsView, setPermUserDirectoryView
  ]);
};


export default usePermissions;