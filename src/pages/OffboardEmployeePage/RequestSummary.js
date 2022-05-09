import React, {memo, useContext} from "react";
import {Box, makeStyles} from "@material-ui/core";
import {OffboardEmployeeContext} from "./OffboardEmployeeContextProvider";
import PaperCardWrapper from "../../components/PaperCardWrapper";
import RequestTopBox from "../../components/blocks/RequestTopBox";
import RequestSummaryItem from "../../components/requestWrapper/RequestSummaryItem";
import RequestSummarySection from "../../components/requestWrapper/RequestSummarySection";
import TaskScheduleTypes from "../../data/constants/TaskScheduleTypes";
import {connect} from "react-redux";

const dateFormat = require("dateformat");

const useStyles = makeStyles({
  text: {
    lineHeight: "1.75rem",
  },
});

const RequestSummary = ({review, selectedOffboardUser}) => {
  const classes = useStyles();
  const {
    checkedDrive,
    checkedCalendar,
    selectedTransferUser,
    offboardingType,
    sendTerminationsEmail,
    selectedDate,
    taskTimeZone,
    hrTimeZone,
    hrSelectedDate,
    hrNotes,
    hrTerminationCode,
    hrTerminationType,
    googleUserAliases,
    unassignLicenses,
    jamfDevicesData,
    googleDevicesData,
  } = useContext(OffboardEmployeeContext);

  const {firstName, lastName, location, jobTitle, email} =
    selectedOffboardUser?.profile || {};

  return (
    <PaperCardWrapper>
      <RequestTopBox
        review={review}
        reviewText="Review &amp; Confirm Request"
        summaryText="Request Completed"
      />

      <RequestSummarySection title="Employee Details">
        <RequestSummaryItem
          name="Employee to Offboard"
          value={`${firstName} ${lastName} | ${location} | ${jobTitle}`}
        />
        <RequestSummaryItem name="Offboarding Type" value={offboardingType} />
        {offboardingType === TaskScheduleTypes.SCHEDULED && (
          <RequestSummaryItem
            name="Date &amp; Time of Offboarding"
            value={
              <>
                {dateFormat(selectedDate, "mmmm d, yyyy h:MM TT")}{" "}
                <p>{taskTimeZone}</p>
              </>
            }
          />
        )}
        <RequestSummaryItem
          name="Notification"
          value={
            <p>
              {sendTerminationsEmail
                ? "Notificaton will be sent to terminations@liveperson.com"
                : "Notification will not be sent to terminations@liveperson.com"}
            </p>
          }
        />
      </RequestSummarySection>

      <RequestSummarySection title="Data Transfer">
        <RequestSummaryItem
          name="Transfer"
          value={
            <>
              {checkedDrive && <p className={classes.text}>Google Drive</p>}{" "}
              {checkedCalendar && (
                <p className={classes.text}>Google Calendar</p>
              )}{" "}
              <p className={classes.text}> {email} </p>
              {googleUserAliases?.map(
                (user) =>
                  user.isChecked && (
                    <p className={classes.text} key={user.alias}>
                      {user.alias}
                    </p>
                  )
              )}
            </>
          }
        />
        {selectedTransferUser && (
          <RequestSummaryItem
            name="Transfer to"
            value={
              <>
                {selectedTransferUser?.profile.email ===
                "livepersondrive@liveperson.com" ? (
                  "livepersondrive@liveperson.com"
                ) : (
                  <>
                    {selectedTransferUser?.profile.firstName}{" "}
                    {selectedTransferUser?.profile.lastName} |{" "}
                    {selectedTransferUser?.profile.location} |
                    {selectedTransferUser?.profile.jobTitle}
                  </>
                )}
              </>
            }
          />
        )}
      </RequestSummarySection>
      {hrTerminationCode && (
        <RequestSummarySection title="HR/Payroll Information">
          <RequestSummaryItem
            name="Termination Code"
            value={hrTerminationCode}
          />
          <RequestSummaryItem
            name="Termination Type"
            value={hrTerminationType}
          />
          <RequestSummaryItem
            name="Payroll Date &amp; Time"
            value={
              <>
                {dateFormat(hrSelectedDate, "mmmm d, yyyy h:MM TT")}{" "}
                {hrTimeZone}
              </>
            }
          />
          <RequestSummaryItem name="Notes" value={hrNotes} />
        </RequestSummarySection>
      )}
      <RequestSummarySection title="License Removal">
        <RequestSummaryItem
          name="License Removal"
          value={
            <>
              {unassignLicenses.some((license) => license.isChecked) ? (
                unassignLicenses.map(
                  (license) =>
                    license.isChecked && (
                      <p
                        className={classes.text}
                        key={license.id}
                      >{`${license.name}`}</p>
                    )
                )
              ) : (
                <p>No Licenses Selected</p>
              )}
            </>
          }
        />
      </RequestSummarySection>
      <RequestSummarySection title="Device Unassignment">
        <RequestSummaryItem
          name="Devices to Unassign"
          value={
            <>
              {jamfDevicesData?.length > 0 || googleDevicesData?.length > 0 ? (
                <>
                  {jamfDevicesData?.map(
                    (device) =>
                      device?.isChecked && (
                        <p className={classes.text} key={device.id}>
                          {`${device.deviceName} : ${device.serialNumber}`}
                        </p>
                      )
                  )}
                  {googleDevicesData?.map(
                    (device) =>
                      device?.isChecked && (
                        <p className={classes.text} key={device.deviceId}>
                          {`Chrome OS Device : ${device.serialNumber}`}
                        </p>
                      )
                  )}
                </>
              ) : (
                <Box>
                  <p>No Devices Selected</p>
                </Box>
              )}
            </>
          }
        />
      </RequestSummarySection>
    </PaperCardWrapper>
  );
};

export default connect(
  (state) => ({
    selectedOffboardUser: state.offboardRequest.get("selectedOffboardUser"),
  }),
  {}
)(memo(RequestSummary));
