const FrontendRoutes = {
  HOME: "/",
  LOGIN_CALLBACK: "/login/callback",
  NON_FTE_AUDIT_REPORT: "/nonfteauditreport",
  REPORTING_DASHBOARD: "/reporting-dashboard",
  REPORT_GENERATOR: "/report-generator",
  CONSOLIDATED_REPORT: "/consolidated-report",
  DASHBOARD: "/dashboard",
  ORGANIZATION_CHART: "/organizationchart",
  CANDIDATE_REQUEST: "/candidate-request",
  MULTI_CANDIDATE_REQUEST: "/multi-candidate-onboarding-request",
  // ONBOARD_EMPLOYEE: "/onboardemployee",
  OFFBOARD_EMPLOYEE: "/offboardemployee",
  ONBOARDING_DASHBOARD: "/onboarding-dashboard",
  ONBOARDING_DASHBOARD_VIEW: (hash) =>
    `/onboarding-dashboard/view/${hash || ":hash"}`,
  REQUISITION_REQUEST: "/requisitionrequest",
  SYSTEM_STATUS: "/systemstatus",
  TASK_MANAGER: "/taskmanager",
  TASK_MANAGER_VIEW: (hash) => `/taskmanager/view/${hash || ":hash"}`,
  TASK_MANAGER_VIEW_TASK: (hash, taskId) =>
    `/taskmanager/view/${hash || ":hash"}/${taskId || ":taskId"}`,
  USER_DIRECTORY: "/userdirectory",
  USER_DIRECTORY_PROFILE: (user) =>
    `/userdirectory/profile/${user || ":userName"}`,
  THIRD_PARTY_DIRECTORY: "/third-party-directory",
  THIRD_PARTY_DIRECTORY_PROFILE: (thirdPartyId) =>
    `/third-party-directory/profile/${thirdPartyId || ":thirdPartyId"}`,
  GLOBAL_SEARCH: "/global-search",
  SERVICE_AND_SYSTEM_DIRECTORY: "/service-and-system-directory",
  SERVICE_AND_SYSTEM_DIRECTORY_SERVICE: "/service-and-system-directory/:id",
};

export const AdminRoutes = {
  ADMIN: "/admin",
  ADMIN_CANDIDATE_PORTAL: "/admin/candidate-portal-admin",
  ADMIN_FTE_CANDIDATE_TRACKER: "/admin/fte-candidate-tracker",
  ADMIN_FTE_CANDIDATE_TRACKER_USERNAME:
    "/admin/fte-candidate-tracker/:username",
  ADMIN_OFFBOARDING_SETTINGS: "/admin/offboardingsettings",
  ADMIN_ONBOARDING_SETTINGS: "/admin/onboardingsettings",
  ADMIN_SCHEDULER_JOBS: "/admin/scheduler-jobs",
  ADMIN_SYSTEM_LOGS: "/admin/systemlogs",
  ADMIN_USER_MANAGEMENT: "/admin/usermanagement",
  ADMIN_USER_BADGING_MANAGEMENT: "/admin/userbadgemanagement",
};
export default FrontendRoutes;
