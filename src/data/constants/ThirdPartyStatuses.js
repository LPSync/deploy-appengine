export const ThirdPartyStatuses = {
  APPROVED: "Approved",
  DISAPPROVED: "Not Approved"
};

export const getStatusName = (code) => {
  if (code?.length > 6){
    return ThirdPartyStatuses.DISAPPROVED;
  }
  return ThirdPartyStatuses.APPROVED;
};

export const getBooleanStatus = (status) => {
  switch (status) {
    case ThirdPartyStatuses.APPROVED:
      return true;
    case ThirdPartyStatuses.DISAPPROVED:
      return false;
    default:
      return undefined;
  }
};