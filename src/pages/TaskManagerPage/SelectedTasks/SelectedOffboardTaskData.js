import React from "react";
import {Box, makeStyles} from "@material-ui/core";
import {
  getOffboardingFullName,
  getScheduleDateOrImmediate,
  getTaskValueOrNotEntered,
  getYesOrNo,
} from "../../../data/helper/helpers";
import TaskScheduleTypes from "../../../data/constants/TaskScheduleTypes";

export const offboardTaskRows = (task) => {
  const {
    id,
    oldTaskId,
    offboardingTask,
    taskScheduleTimezone,
    taskScheduleType,
  } = task || {};
  const {
    offboardUsername,
    offboardEmployeeType,
    transferGdrive,
    transferGcalendar,
    transferGdataStudio,
    offboardingUnassignDevices,
    offboardingUnassignLicenses,
    unassignLicense,
    transferAlias,
    offboardingTransferAlias,
    transferUsername,
    transferFirstName,
    transferLastName,
  } = offboardingTask || {};
  return [
    {id: "taskId", name: "Task ID", value: id},
    {
      id: "oldTaskId",
      name: "Old Task ID",
      value: oldTaskId,
      hidden: !oldTaskId,
    },
    {id: "name", name: "Name", value: getOffboardingFullName(task)},
    {id: "username", name: "Username", value: offboardUsername},
    {is: "employeeType", name: "Employee Type", value: offboardEmployeeType},
    {
      id: "transferGdrive",
      name: "Transfer Google Drive?",
      value: getYesOrNo(transferGdrive),
    },
    {
      id: "transferGcalendar",
      name: "Transfer Google Calendar?",
      value: getYesOrNo(transferGcalendar),
    },
    {
      id: "transferGdataStudio",
      name: "Transfer Google Data Studio?",
      value: getYesOrNo(transferGdataStudio),
    },
    {
      id: "separateDevices",
      name: "Separate Devices",
      value: <UnassignDevicesBox devices={offboardingUnassignDevices} />,
    },
    {
      id: "removeLicenses",
      name: "Remove Licenses",
      value: (
        <UnassignLicensesBox
          licenses={offboardingUnassignLicenses}
          unassignLicense={unassignLicense}
        />
      ),
    },
    {
      id: "transferAliases",
      name: "Transfer Aliases",
      value: transferAlias
        ? offboardingTransferAlias?.map((alias) => (
            <p key={alias?.id}>{alias?.aliasName}</p>
          ))
        : "No aliases",
    },
    {
      id: "transferTo",
      name: "Transfer to",
      value: transferUsername
        ? (transferFirstName !== "-" && transferFirstName) +
          " " +
          (transferLastName !== "-" && transferLastName + " | ") +
          transferUsername
        : "Not entered",
    },
    {
      id: "transferDateTime",
      name: "Transfer Date/Time",
      value: getScheduleDateOrImmediate(task),
    },
    {
      id: "transferTimezone",
      name: "Transfer Timezone",
      value: taskScheduleTimezone,
      hidden: !(taskScheduleType === TaskScheduleTypes.SCHEDULED),
    },
  ];
};

export const hrPayrollRows = (task) => {
  const offboardingTask = task?.offboardingTask;
  return [
    {
      id: "terminationCode",
      name: "Termination Code",
      value: getTaskValueOrNotEntered(offboardingTask, "hrTerminationCode"),
    },
    {
      id: "terminationType",
      name: "Termination Type",
      value: getTaskValueOrNotEntered(offboardingTask, "hrTerminationType"),
    },
    {
      id: "payrollEndDate",
      name: " Payroll End Date & Time",
      value: getTaskValueOrNotEntered(
        offboardingTask,
        "payrollEndDateTime",
        "payrollEndTimezone"
      ),
    },
    {
      id: "payrollNotes",
      name: "Payroll Notes",
      value: getTaskValueOrNotEntered(offboardingTask, "payrollNote"),
    },
  ];
};

const useStyles = makeStyles((theme) => ({
  licenseBox: {
    height: 100,
    overflow: "auto",
    border: "1px solid " + theme.palette.secondary.main,
    borderRadius: "5px",
    paddingLeft: "1rem",
  },
}));

const UnassignLicensesBox = ({unassignLicense, licenses}) => {
  const classes = useStyles();
  return (
    <Box className={(licenses?.length > 1 && classes.licenseBox) || ""}>
      {unassignLicense
        ? licenses?.map((license) => (
            <p key={license.id}>{license.licenseName}</p>
          ))
        : "No licenses"}
    </Box>
  );
};

const UnassignDevicesBox = ({devices}) => {
  return (
    <>
      {devices?.length > 0
        ? devices?.map((device) => (
            <p key={device.id}>
              {device.deviceName}{" "}
              {device.deviceSerialNumber !== "-" &&
                ` : ${device.deviceSerialNumber}`}
            </p>
          ))
        : "No devices"}
    </>
  );
};
