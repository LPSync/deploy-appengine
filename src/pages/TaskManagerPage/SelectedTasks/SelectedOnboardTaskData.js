import React from "react";
import {Box, makeStyles} from "@material-ui/core";
import {
  getOnboardingFullName,
  getScheduleDateOrImmediate,
  getYesOrNo,
} from "../../../data/helper/helpers";

export const onboardTaskRows = (task, locationDescription) => {
  const {id, oldTaskId, onboardingTask} = task || {};
  return [
    {id: "taskId", name: "Task ID", value: id},
    {
      id: "oldTaskId",
      name: "Old Task ID",
      value: oldTaskId,
      hidden: !oldTaskId,
    },
    {
      id: "selectedReqId",
      name: "Selected Requisition ID",
      value: getTaskValueOrNA(onboardingTask, "reqId"),
    },
    {id: "name", name: "Name", value: getOnboardingFullName(task)},
    {id: "username", name: "Username", value: onboardingTask?.onboardUsername},
    {id: "email", name: "Email", value: onboardingTask?.onboardEmail},
    {
      id: "nonLpEmail",
      name: "Non-LP Email",
      value: onboardingTask?.onboardNonLpEmail,
    },
    {id: "company", name: "Company", value: onboardingTask?.onboardCompany},
    {id: "jobTitle", name: "Job Title", value: onboardingTask?.onboardJobTitle},
    {
      id: "employeeType",
      name: "Employee Type",
      value: onboardingTask?.onboardEmployeeType,
    },
    {
      id: "poNumber",
      name: "Purchase Order Number",
      value: getTaskValueOrNA(onboardingTask, "onboardPoNumber"),
    },
    {
      id: "location",
      name: "Location",
      value: `${onboardingTask?.onboardLocationDescription} (${onboardingTask?.onboardLocation})`,
    },
    {
      id: "manager",
      name: "Manager",
      value: `${onboardingTask?.onboardManagerFirstName || ""} ${
        onboardingTask?.onboardManagerLastName || ""
      } | ${onboardingTask?.onboardManagerEmail}`,
    },
    {
      id: "department",
      name: "Department",
      value: onboardingTask?.onboardDepartment,
    },
    {
      id: "officeNumber",
      name: "Office Number",
      value: getTaskValueOrNA(onboardingTask, "onboardOfficeNumber"),
    },
    {
      id: "mobileNumber",
      name: "Mobile Number",
      value: getTaskValueOrNA(onboardingTask, "onboardMobileNumber"),
    },
    {
      id: "googleAccountNeeded",
      name: "Google Account Needed",
      value:
        onboardingTask?.isGoogleAccountNeeded !== null
          ? getYesOrNo(onboardingTask?.isGoogleAccountNeeded)
          : "n/a",
    },
    {
      id: "onboardDevice",
      name: "Device Requested",
      value: onboardingTask?.onboardDevice,
    },
    {
      id: "oktaGroups",
      name: "Okta Groups",
      value: (
        <OktaGroupBox
          onboardingOktaGroups={onboardingTask?.onboardingOktaGroups}
        />
      ),
    },
    {
      id: "onboardDate",
      name: "Onboarding Date",
      value: getScheduleDateOrImmediate(task, true),
    },
  ];
};

const useStyles = makeStyles(() => ({
  groupsBox: {
    height: 100,
    overflow: "auto",
    border: "1px solid #4667c8",
    borderRadius: "5px",
    paddingLeft: "1rem",
  },
}));

const OktaGroupBox = ({onboardingOktaGroups}) => {
  const classes = useStyles();
  return (
    <Box
      className={(onboardingOktaGroups?.length > 1 && classes.groupsBox) || ""}
    >
      {onboardingOktaGroups?.length > 0
        ? onboardingOktaGroups.map((group) => (
            <p key={group.oktaGroupId}>{group.oktaGroupName}</p>
          ))
        : "No groups"}
    </Box>
  );
};

const getTaskValueOrNA = (onboardingTask, field) =>
  onboardingTask?.[field] || "n/a";
