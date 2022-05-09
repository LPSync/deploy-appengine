import React, {createContext, useState} from "react";

export const AuthUserContext = createContext();

const AuthUserContextProvider = ({children}) => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [authUser, setAuthUser] = useState();
  const [authUserDirectReports, setAuthUserDirectReports] = useState([]);
  const [authUserRoles, setAuthUserRoles] = useState();
  const [authUserPermissions, setAuthUserPermissions] = useState([]);
  const [permDashboardView, setPermDashboardView] = useState(false);
  const [permMultiCandidateRequestView, setMultiCandidateRequestView] =
    useState(false);
  const [permBadgeRequestApproveTasks, setPermBadgeRequestApproveTasks] =
    useState(false);
  const [permBadgeRequestCancelTasks, setPermBadgeRequestCancelTasks] =
    useState(false);
  const [permBadgeRequestRejectTasks, setPermBadgeRequestRejectTasks] =
    useState(false);
  const [permOffboardingAll, setPermOffboardingAll] = useState(false);
  const [permOffboardingTeam, setPermOffboardingTeam] = useState(false);
  const [permOffboardingNfte, setPermOffboardingNfte] = useState(false);
  const [permOffboardingApprovalBypass, setPermOffboardingApprovalBypass] =
    useState(false);
  const [permOffboardingApproveTasks, setPermOffboardingApproveTasks] =
    useState(false);
  const [permOffboardingCancelTasks, setPermOffboardingCancelTasks] =
    useState(false);
  const [permOffboardingHrInfo, setPermOffboardingHrInfo] = useState(false);
  const [permOffboardingRejectTasks, setPermOffboardingRejectTasks] =
    useState(false);
  const [permOnboardingAll, setPermOnboardingAll] = useState(false);
  const [permOnboardingApprovalBypass, setPermOnboardingApprovalBypass] =
    useState(false);
  const [permOnboardingApproveTasks, setPermOnboardingApproveTasks] =
    useState(false);
  const [permOnboardingCancelTasks, setPermOnboardingCancelTasks] =
    useState(false);
  const [permOnboardingRejectTasks, setPermOnboardingRejectTasks] =
    useState(false);
  const [permOnboardingRequisitionBypass, setPermOnboardingRequisitionBypass] =
    useState(false);
  const [permOnboardingTeam, setPermOnboardingTeam] = useState(false);
  const [permOnboardingDashboardView, setPermOnboardingDashboardView] =
    useState(false);
  const [permOrgChartView, setPermOrgChartView] = useState(false);
  const [permReportGeneratorView, setPermReportGeneratorView] = useState(false);
  const [permReportingDashboardView, setPermReportingDashboardView] =
    useState(false);
  const [permReportNonFteAudit, setPermReportNonFteAudit] = useState(false);
  const [permRequisitionAll, setPermRequisitionAll] = useState(false);
  const [permRequisitionApproveTasks, setPermRequisitionApproveTasks] =
    useState(false);
  const [permRequisitionRejectTasks, setPermRequisitionRejectTasks] =
    useState(false);
  const [permRequisitionCancelTasks, setPermRequisitionCancelTasks] =
    useState(false);
  const [permSysMgmtBadgeMgmt, setPermSysMgmtBadgeMgmt] = useState(false);
  const [
    permSysMgmtCandidatePortalAccess,
    setPermSysMgmtCandidatePortalAccess,
  ] = useState(false);
  const [permSysMgmtFteCandidateTracker, setPermSysMgmtFteCandidateTracker] =
    useState(false);
  const [permSystemsAndServicesView, setPermSystemsAndServicesView] =
    useState(false);
  const [permSysMgmtLogs, setPermSysMgmtLogs] = useState(false);
  const [permSysMgmtManage, setPermSysMgmtManage] = useState(false);
  const [permSysMgmtSchedulerJobs, setPermSysMgmtSchedulerJobs] =
    useState(false);
  const [permSysMgmtSettingsOffboarding, setPermSysMgmtSettingsOffboarding] =
    useState(false);
  const [permSysMgmtSettingsOnboarding, setPermSysMgmtSettingsOnboarding] =
    useState(false);
  const [permTaskManagerViewAll, setPermTaskManagerViewAll] = useState(false);
  const [
    permTaskManagerViewAllOffboarding,
    setPermTaskManagerViewAllOffboarding,
  ] = useState(false);
  const [
    permTaskManagerViewAllOnboarding,
    setPermTaskManagerViewAllOnboarding,
  ] = useState(false);
  const [
    permTaskManagerViewAllRequisition,
    setPermTaskManagerViewAllRequisition,
  ] = useState(false);
  const [permTaskManagerViewTeam, setPermTaskManagerViewTeam] = useState(false);
  const [permTaskManagerViewHrInfo, setPermTaskManagerViewHrInfo] =
    useState(false);
  const [permUserDirectoryFinanceView, setPermUserDirectoryFinanceView] =
    useState(false);
  const [permUserDirectoryItDetailsView, setPermUserDirectoryItDetailsView] =
    useState(false);
  const [permUserDirectoryLpsyncManage, setPermUserDirectoryLpsyncManage] =
    useState(false);
  const [permUserDirectoryNonFteAudit, setPermUserDirectoryNonFteAudit] =
    useState(false);
  const [permUserDirectoryOrgDetailsView, setPermUserDirectoryOrgDetailsView] =
    useState(false);
  const [permUserDirectoryView, setPermUserDirectoryView] = useState(false);
  const [permThirdPartyDirectoryView, setPermThirdPartyDirectoryView] =
    useState(false);
  const [permBulkApproverOnboarding, setPermBulkApproverOnboarding] =
    useState(false);
  const [permBulkApproverRequisition, setPermBulkApproverRequisition] =
    useState(false);
  const [permBulkApproverOffboarding, setPermBulkApproverOffboarding] =
    useState(false);

  return (
    <AuthUserContext.Provider
      value={{
        isPageLoading,
        setIsPageLoading,
        authUser,
        setAuthUser,
        authUserDirectReports,
        setAuthUserDirectReports,
        authUserRoles,
        setAuthUserRoles,
        authUserPermissions,
        setAuthUserPermissions,
        permDashboardView,
        setPermDashboardView,
        permMultiCandidateRequestView,
        setMultiCandidateRequestView,
        permBadgeRequestApproveTasks,
        setPermBadgeRequestApproveTasks,
        permBadgeRequestCancelTasks,
        setPermBadgeRequestCancelTasks,
        permBadgeRequestRejectTasks,
        setPermBadgeRequestRejectTasks,
        permOffboardingAll,
        setPermOffboardingAll,
        permOffboardingTeam,
        setPermOffboardingTeam,
        permOffboardingNfte,
        setPermOffboardingNfte,
        permOffboardingApprovalBypass,
        setPermOffboardingApprovalBypass,
        permOffboardingApproveTasks,
        setPermOffboardingApproveTasks,
        permOffboardingCancelTasks,
        setPermOffboardingCancelTasks,
        permOffboardingHrInfo,
        setPermOffboardingHrInfo,
        permOffboardingRejectTasks,
        setPermOffboardingRejectTasks,
        permOnboardingAll,
        setPermOnboardingAll,
        permOnboardingApprovalBypass,
        setPermOnboardingApprovalBypass,
        permOnboardingApproveTasks,
        setPermOnboardingApproveTasks,
        permOnboardingCancelTasks,
        setPermOnboardingCancelTasks,
        permOnboardingRejectTasks,
        setPermOnboardingRejectTasks,
        permOnboardingRequisitionBypass,
        setPermOnboardingRequisitionBypass,
        permOnboardingTeam,
        setPermOnboardingTeam,
        permOnboardingDashboardView,
        setPermOnboardingDashboardView,
        permOrgChartView,
        setPermOrgChartView,
        permReportGeneratorView,
        setPermReportGeneratorView,
        permReportingDashboardView,
        setPermReportingDashboardView,
        permRequisitionAll,
        setPermRequisitionAll,
        permRequisitionApproveTasks,
        setPermRequisitionApproveTasks,
        permRequisitionRejectTasks,
        setPermRequisitionRejectTasks,
        permRequisitionCancelTasks,
        setPermRequisitionCancelTasks,
        permSysMgmtBadgeMgmt,
        setPermSysMgmtBadgeMgmt,
        permSysMgmtCandidatePortalAccess,
        setPermSysMgmtCandidatePortalAccess,
        permSysMgmtFteCandidateTracker,
        setPermSysMgmtFteCandidateTracker,
        permSystemsAndServicesView,
        setPermSystemsAndServicesView,
        permSysMgmtLogs,
        setPermSysMgmtLogs,
        permSysMgmtManage,
        setPermSysMgmtManage,
        permSysMgmtSchedulerJobs,
        setPermSysMgmtSchedulerJobs,
        permSysMgmtSettingsOffboarding,
        setPermSysMgmtSettingsOffboarding,
        permSysMgmtSettingsOnboarding,
        setPermSysMgmtSettingsOnboarding,
        permTaskManagerViewAll,
        setPermTaskManagerViewAll,
        permTaskManagerViewAllOffboarding,
        setPermTaskManagerViewAllOffboarding,
        permTaskManagerViewAllOnboarding,
        setPermTaskManagerViewAllOnboarding,
        permTaskManagerViewAllRequisition,
        setPermTaskManagerViewAllRequisition,
        permTaskManagerViewTeam,
        setPermTaskManagerViewTeam,
        permTaskManagerViewHrInfo,
        setPermTaskManagerViewHrInfo,
        permUserDirectoryFinanceView,
        setPermUserDirectoryFinanceView,
        permUserDirectoryItDetailsView,
        setPermUserDirectoryItDetailsView,
        permUserDirectoryLpsyncManage,
        setPermUserDirectoryLpsyncManage,
        permUserDirectoryNonFteAudit,
        setPermUserDirectoryNonFteAudit,
        permUserDirectoryOrgDetailsView,
        setPermUserDirectoryOrgDetailsView,
        permUserDirectoryView,
        setPermUserDirectoryView,
        permThirdPartyDirectoryView,
        setPermThirdPartyDirectoryView,
        permReportNonFteAudit,
        setPermReportNonFteAudit,
        permBulkApproverOnboarding,
        setPermBulkApproverOnboarding,
        permBulkApproverRequisition,
        setPermBulkApproverRequisition,
        permBulkApproverOffboarding,
        setPermBulkApproverOffboarding,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
