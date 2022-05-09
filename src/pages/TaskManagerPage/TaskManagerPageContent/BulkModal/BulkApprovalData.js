import React from "react";
import TaskTypes from "../../../../data/constants/TaskTypes";
import { joinWith, joinWithSpace } from "../../../../data/helper/helpers";
import { getDateString, getDateWithTimeString } from "../../../../data/helper/DateTimezoneHelpers";
import PersonIcon from "@material-ui/icons/Person";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import { isFullTimeEmployee } from "../../../../data/constants/EmployeeTypes";

export const getBulkApprovalTaskData = task => {
  if (!task || !Object.values(TaskTypes).includes(task?.taskType)) {
    return null;
  }
  const {
    id,
    taskType,
    taskScheduleType,
    taskScheduleDateTime,
    taskScheduleTimezone,
    taskCreatedDateTime,
    taskCreatorFirstName,
    taskCreatorLastName,
    taskCreatorUsername,
    onboardingTask,
    requisitionTask,
    offboardingTask,
  } = task;
  const topSection = {
    id,
    taskType,
    requestedDate: taskCreatedDateTime && getDateWithTimeString(taskCreatedDateTime),
    requestedBy: joinWithSpace(taskCreatorFirstName, taskCreatorLastName),
  };
  if (task?.taskType === TaskTypes.ONBOARDING) {
    return getOnboardingDetails(topSection, onboardingTask, taskScheduleType, taskScheduleDateTime && getDateWithTimeString(taskScheduleDateTime, taskScheduleTimezone));
  }
  if (task?.taskType === TaskTypes.REQUISITION) {
    return getRequisitionDetails(topSection, requisitionTask);
  }
  if (task?.taskType === TaskTypes.OFFBOARDING) {
    return getOffboardingDetails(topSection, offboardingTask, taskScheduleType, taskScheduleDateTime && getDateWithTimeString(taskScheduleDateTime, taskScheduleTimezone));
  }
};

const getOnboardingDetails = (topSection, onboardingTask, taskScheduleType, taskScheduleDate) => {
  const {
    onboardFirstName,
    onboardLastName,
    onboardEmail,
    onboardNonLpEmail,
    reqId,
    onboardManagerFirstName,
    onboardManagerLastName,
    onboardJobTitle,
    onboardLocationDescription,
  } = onboardingTask || {};
  return {
    ...topSection,
    sections: [
      {
        icon: <PersonIcon fontSize="small" />,
        title: "Onboard Who",
        columnSize: 3,
        rows: [
          { value: joinWithSpace(onboardFirstName, onboardLastName) },
          { value: onboardEmail },
          { value: onboardNonLpEmail },
        ],
      },
      {
        icon: <ScheduleIcon fontSize="small" />,
        title: "Onboard When",
        columnSize: 4,
        rows: [
          { value: taskScheduleType },
          { value: taskScheduleDate },
        ],
      },
      {
        icon: <SyncAltIcon fontSize="small" />,
        title: "Onboard Specifics",
        columnSize: 5,
        rows: [
          { label: "Req No", value: reqId || "n/a" },
          { label: "Manager", value: joinWithSpace(onboardManagerFirstName, onboardManagerLastName) },
          { label: "Job Title", value: onboardJobTitle },
          { label: "Location", value: onboardLocationDescription },
        ],
      },
    ],
  };
};

const getRequisitionDetails = (topSection, requisitionTask) => {
  const {
    reqStartDate,
    reqType,
    reqHiringManagerFirstName,
    reqHiringManagerLastName,
    isBackfill,
    reqBackfillFirstName,
    reqBackfillLastName,
    reqBackfillUsername,
    reqJobCode,
    reqJobTitle,
    reqBusinessUnit,
    reqDepartment,
    reqLocation,
    reqLocationDescription,
    reqSpendAmount,
    reqSpendCurrency,
    reqBonusAmount,
    reqBonusType,
    reqCompanyCode,
    reqParentMgmtCC,
    reqManagementCC,
    reqFunctionalAreaDesc,
    reqCountryDesc,
    reqContractHoursPerWeek,
    reqContractMonths,
    comments,
  } = requisitionTask || {};

  return {
    ...topSection,
    sections: [
      {
        icon: <PersonIcon fontSize="small" />,
        title: "What",
        columnSize: 3,
        rows: [
          { value: reqType },
          { label: "Job Code", value: joinWith(" | ")(reqJobCode, reqJobTitle) },
          { label: "Manager", value: joinWithSpace(reqHiringManagerFirstName, reqHiringManagerLastName) },
          {
            label: "Backfill",
            value: isBackfill
              ? joinWith(" | ")(joinWithSpace(reqBackfillFirstName, reqBackfillLastName), reqBackfillUsername)
              : "no",
          },
        ],
      },
      {
        icon: <ScheduleIcon fontSize="small" />,
        title: "When and Where",
        columnSize: 4,
        rows: [
          { label: "Start Date", value: getDateString(reqStartDate) },
          { label: "Location", value: `${reqLocationDescription} (${reqLocation})` },
          { label: "Business Unit", value: reqBusinessUnit },
          { label: "Department", value: reqDepartment },
        ],
      },
      {
        icon: <AssignmentTurnedInOutlinedIcon fontSize="small" />,
        title: "Financial Info",
        columnSize: 5,
        rows: [
          {
            label: "Cost Center",
            value: joinWith("-")
            (reqCompanyCode, reqParentMgmtCC, reqManagementCC, reqFunctionalAreaDesc, reqCountryDesc, "00"),
          },
          { label: "Req Spend", value: joinWithSpace(reqSpendCurrency, reqSpendAmount) },
          { label: "Bonus", value: joinWithSpace(reqBonusAmount, reqBonusType) },
          {
            label: "Contract Length",
            value: `${(reqContractMonths || "") + " Months;"} ${reqContractHoursPerWeek || ""} Hours per Week`,
          },
        ],
      },
    ],
    commentSection: comments,
  };
};

const getOffboardingDetails = (topSection, offboardingTask, taskScheduleType, taskScheduleDate) => {
  const {
    offboardFirstName,
    offboardLastName,
    offboardUsername,
    offboardEmployeeType,
    transferFirstName,
    transferLastName,
    transferGdrive,
    transferGcalendar,
    offboardingTransferAlias,
    hrTerminationCode,
    hrTerminationType,
    payrollEpochTime,
    payrollEndTimezone,
    payrollEndDateTime
  } = offboardingTask || {};
  const disabled = isFullTimeEmployee(offboardEmployeeType) &&
    !(hrTerminationCode && hrTerminationType && payrollEpochTime && payrollEndTimezone && payrollEndDateTime);
  console.log(isFullTimeEmployee(offboardEmployeeType), hrTerminationCode, hrTerminationType, payrollEpochTime, payrollEndTimezone, payrollEndDateTime, disabled)
  return {
    ...topSection,
    disabled,
    hoverText: "This task contains details that need to be submitted individually.",
    sections: [
      {
        icon: <PersonIcon fontSize="small" />,
        title: "Offboard Who",
        columnSize: 3,
        rows: [
          { value: joinWithSpace(offboardFirstName, offboardLastName) },
          { value: offboardUsername },
        ],
      },
      {
        icon: <ScheduleIcon fontSize="small" />,
        title: "Offboard When",
        columnSize: 4,
        rows: [
          { value: taskScheduleType },
          { value: taskScheduleDate },
        ],
      },
      {
        icon: <SyncAltIcon fontSize="small" />,
        title: "Offboard What",
        columnSize: 5,
        rows: [
          {
            label: "Transfer",
            value: joinWith(", ")(
              transferGdrive && "Google Drive",
              transferGcalendar && "Google Calendar",
              ...offboardingTransferAlias?.map(alias => alias?.aliasName)),
          },
          { label: "To", value: joinWithSpace(transferFirstName, transferLastName) },
        ],
      },
    ],
  };
};