export const ONBOARDING_CHARTS_SUBTITLE =
  "Note: These statistics are only for Non-FTEs onboarded via LPSync.";
export const REQUISITION_CHARTS_SUBTITLE =
  "Note: These statistics are only for Requisition Requests via LPSync.";

export const DEFAULT_LOADING_INFO_OBJECT = {
  organization: true,
  boarding: true,
  requisitions: true,
};

export const CHARTS_TITLES = {
  last7days: "Last 7 days",
  last30days: "Last 30 days",
  last90days: "Last 90 days",
};

export const REQUISITION_CHARTS_SUBTITLES = {
  last30days:
    "Note: These statistics are only for Requisition Requests via LPSync.",
  currentYear:
    "A filled requisition is one that has been used to onboard a candidate.",
  open: "These are all the current open requisitions in LPSync that have no candidate associated with it.",
};

export const CHARTS_WITH_KEY_ONLY_COUNT = ["department", "location"];

export const ORGANIZATION_CHARTS_CONFIG = {
  title: "Organization Statistics",
  countersLabels: {
    department: "Total departments count",
    employeeType: "Total employees count",
    location: "Total locations count",
  },
  chartsType: "PieChart",
};

export const ONBOARDING_CHARTS_CONFIG = {
  title: "Onboarding Statistics",
  subtitle:
    "Note: These statistics are only for Non-FTEs onboarded via LPSync.",
  countersLabels: {
    last7days: "Total candidates count",
    last30days: "Total candidates count",
    last90days: "Total candidates count",
    currentYear: "Total candidates count",
  },
  chartsType: "PieChart",
};

export const OFFBOARDING_CHARTS_CONFIG = {
  title: "Offboarding Statistics",
  countersLabels: {
    last7days: "Total candidates count",
    last30days: "Total candidates count",
    last90days: "Total candidates count",
    currentYear: "Total candidates count",
  },
  chartsType: "PieChart",
};

export const REQUISITIONS_CHARTS_CONFIG = {
  title: "Requisition Statistics",
  subtitle:
    "Note: These statistics are only for Requisition Requests via LPSync.",
  countersLabels: {
    last30days: "Total requisitions count",
    open: "Total requisitions count",
    currentYear: "Total requisitions count",
  },
  chartsLabels: {
    last30days:
      "These statistics are only for Requisition Requests via LPSync.",
    open: "These are all the current open requisitions in LPSync that have no candidate associated with it.",
    currentYear:
      "A filled requisition is one that has been used to onboard a candidate.",
  },
  chartsType: "BarChart",
};
