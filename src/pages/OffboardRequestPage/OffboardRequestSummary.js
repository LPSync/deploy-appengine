import React, {memo} from "react";
import {useSelector} from "react-redux";
import {Box, Divider} from "@material-ui/core";
import PaperCardWrapper from "../../components/PaperCardWrapper";
import RequestSummarySection from "../../components/requestWrapper/RequestSummarySection";
import RequestSummaryItem from "../../components/requestWrapper/RequestSummaryItem";
import SummaryTopTypography from "../../components/typographies/TopTypography";
import dateFormat from "dateformat";
import TaskScheduleTypes from "../../data/constants/TaskScheduleTypes";
import CustomChip from "../../components/chips/CustomChip";
import SelectedOffboardEmployee from "./OffboardWhoContainers/SelectedOffboardEmployee";
import {
  getInOffboardingRequest,
  getOffboardingRequestObject,
} from "./OffboardRequestPageContent";

const OffboardRequestSummary = ({review}) => {
  const dataTransfer = useSelector(getOffboardingRequestObject("dataTransfer"));
  const deviceUnassign = useSelector(
    getOffboardingRequestObject("deviceUnassign")
  );
  const unassignLicenses = useSelector(
    getInOffboardingRequest(["licenseRemoval", "unassignLicenses"])
  );
  const selectedOffboardUser = useSelector(
    getInOffboardingRequest(["offboardDetails", "selectedOffboardUser"])
  );
  const taskScheduling = useSelector(
    getOffboardingRequestObject("taskScheduling")
  );
  const hrInformation = useSelector(
    getOffboardingRequestObject("hrInformation")
  );

  const {
    selectedTransferUser,
    isDriveChecked,
    isCalendarChecked,
    isDataStudioChecked,
  } = dataTransfer || {};
  const {jamfDevicesData, googleDevicesData} = deviceUnassign || {};
  const {
    scheduleType,
    scheduleDate,
    scheduleTimeZone,
    isNotifyTerminationsChecked,
  } = taskScheduling || {};
  const {
    hrTerminationCode,
    hrTerminationType,
    hrSelectedDate,
    hrTimeZone,
    hrNotes,
  } = hrInformation || {};

  return (
    <Box height={"37vh"}>
      <PaperCardWrapper>
        <Box>
          <SummaryTopTypography>
            {review ? "Review & Confirm Request" : "Request Completed"}
          </SummaryTopTypography>
        </Box>

        <RequestSummarySection title="Employee Details">
          <RequestSummaryItem
            name="Offboard"
            value={
              <SelectedOffboardEmployee
                userProfile={selectedOffboardUser?.profile}
              />
            }
          />
          <RequestSummaryItem name="Schedule type" value={scheduleType} />
          {scheduleType === TaskScheduleTypes.SCHEDULED && (
            <RequestSummaryItem
              name="Scheduled date &amp; time"
              value={
                <>
                  {dateFormat(scheduleDate, "mmmm d, yyyy h:MM TT")}{" "}
                  <p>{scheduleTimeZone}</p>
                </>
              }
            />
          )}
          <RequestSummaryItem
            name="Notification"
            value={
              <p>
                {isNotifyTerminationsChecked
                  ? "send to terminations@liveperson.com"
                  : "do not send to terminations@liveperson.com"}
              </p>
            }
          />
        </RequestSummarySection>
        <Divider />
        <RequestSummarySection title="Data Transfer">
          <RequestSummaryItem
            name="Transfer data from"
            value={
              <>
                {isDriveChecked && <CustomChip label={"Google Drive"} />}
                {isCalendarChecked && <CustomChip label={"Google Calendar"} />}
                {isDataStudioChecked && (
                  <CustomChip label={"Google Data Studio"} />
                )}
              </>
            }
          />
          {selectedTransferUser && (
            <RequestSummaryItem
              name="Transfer data to"
              value={
                <>
                  {selectedTransferUser?.profile?.email ===
                  "livepersondrive@liveperson.com" ? (
                    "livepersondrive@liveperson.com"
                  ) : (
                    <>
                      {selectedTransferUser?.profile?.firstName}{" "}
                      {selectedTransferUser?.profile?.lastName} |{" "}
                      {selectedTransferUser?.profile?.location} |{" "}
                      {selectedTransferUser?.profile?.jobTitle}
                    </>
                  )}
                </>
              }
            />
          )}
        </RequestSummarySection>
        <Divider />
        <RequestSummarySection title="Licenses/Devices">
          <RequestSummaryItem
            name="Remove these licenses"
            value={
              <>
                {unassignLicenses.some((license) => license.isChecked) ? (
                  unassignLicenses.map(
                    (license) =>
                      license.isChecked && <CustomChip label={license.name} />
                  )
                ) : (
                  <p>No licenses selected</p>
                )}
              </>
            }
          />
          <RequestSummaryItem
            name="Unassign these devices"
            value={
              <>
                {jamfDevicesData?.length > 0 ||
                googleDevicesData?.length > 0 ? (
                  <>
                    {jamfDevicesData?.map(
                      (device) =>
                        device?.isChecked && (
                          <CustomChip
                            label={`${device.deviceName} : ${device.serialNumber}`}
                          />
                        )
                    )}
                    {googleDevicesData?.map(
                      (device) =>
                        device?.isChecked && (
                          <CustomChip
                            label={`Chrome OS Device : ${device.serialNumber}`}
                          />
                        )
                    )}
                  </>
                ) : (
                  <Box>
                    <p>No devices selected</p>
                  </Box>
                )}
              </>
            }
          />
        </RequestSummarySection>

        {hrTerminationCode && (
          <>
            <Divider />
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
          </>
        )}
      </PaperCardWrapper>
    </Box>
  );
};

export default memo(OffboardRequestSummary);
