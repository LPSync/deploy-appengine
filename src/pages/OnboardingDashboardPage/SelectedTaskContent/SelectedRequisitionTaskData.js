import {getFullDateString} from "../../../data/helper/DateTimezoneHelpers";

export const requisitionTaskRows = (task) => {
  const {id, oldTaskId, requisitionTask} = task || {};
  const {
    reqHiringManagerFirstName, reqHiringManagerLastName, reqHiringManagerEmail,
    isBackfill, reqBackfillFirstName, reqBackfillLastName, reqBackfillUsername, reqCountryDesc,
    reqCompanyCode, reqParentMgmtCC, reqManagementCC, reqFunctionalAreaDesc, reqFulfilled, reqFulfilledID,
    reqBonusAmount, reqBonusType, reqCommissionAmount, reqCommissionCurrency, comments,
  } = requisitionTask || {};
  return [
    {id: "taskId", name: "Task ID", value: id},
    {id: "oldTaskId", name: "Old Task ID", value: oldTaskId, hidden: !oldTaskId},
    {
      id: "requisitionFulfilled",
      name: "Requisition Fulfilled",
      value: reqFulfilled ? `Yes; Candidate Task ID: ${reqFulfilledID}` : "No"
    }, // different from task manager
    {id: "requisitionTask", name: "Requisition Type", value: requisitionTask?.reqType},
    {id: "plannedStartDate", name: "Planned Start Date", value: getFullDateString(requisitionTask?.reqStartDate)},
    {
      id: "hiringManager",
      name: "Hiring Manager",
      value: `${reqHiringManagerFirstName || ""} ${reqHiringManagerLastName || ""} | ${reqHiringManagerEmail}`,
    },
    {
      id: "businessUnit",
      name: "Business Unit",
      value: requisitionTask?.reqBusinessUnit,
    },
    {
      id: "department",
      name: "Department",
      value: requisitionTask?.reqDepartment,
    },
    {
      id: "location",
      name: "Location",
      value: `${requisitionTask?.reqLocationDescription} (${requisitionTask?.reqLocation})`,
    },
    {
      id: "isBackfill",
      name: "Backfill?",
      value: isBackfill ? `yes; ${reqBackfillFirstName} ${reqBackfillLastName} | ${reqBackfillUsername}` : "no",
    },
    {
      id: "costCenter",
      name: "Cost Center",
      value: `${reqCompanyCode}-${reqParentMgmtCC}-${reqManagementCC}-${reqFunctionalAreaDesc}-${reqCountryDesc}-00`,
    },
    {
      id: "jobCode",
      name: "Job Code",
      value: `${requisitionTask?.reqJobCode} | ${requisitionTask?.reqJobTitle}`,
    },
    {
      id: "requisitionSpend",
      name: "Requisition Spend",
      value: `${requisitionTask?.reqSpendCurrency} ${requisitionTask?.reqSpendAmount} ${requisitionTask?.reqSpendPeriod}`,
    },
    {
      id: "bonus",
      name: "Bonus",
      value: reqBonusAmount ? `${reqBonusAmount} ${reqBonusType}` : "not entered",
    },
    {
      id: "commission",
      name: "Commission",
      value: reqCommissionAmount ? `${reqCommissionAmount} ${reqCommissionCurrency}` : "not entered",
    },
    {
      id: "contractLength",
      name: "Contract Length",
      value: `${requisitionTask?.reqContractMonths} months at ${requisitionTask?.reqContractHoursPerWeek} hours per week`,
    },
    {
      id: "comments",
      name: "Comments",
      value: comments?.length > 0 ? `${comments}` : "not entered",
    },
  ];
};