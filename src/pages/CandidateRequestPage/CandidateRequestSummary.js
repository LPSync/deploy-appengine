import React, {memo} from "react";
import {connect} from "react-redux";
import PaperCardWrapper from "../../components/PaperCardWrapper";
import RequestSummarySection from "../../components/requestWrapper/RequestSummarySection";
import RequestSummaryItem from "../../components/requestWrapper/RequestSummaryItem";
import SummaryTopTypography from "../../components/typographies/TopTypography";
import {Box} from "@material-ui/core";
import dateFormat from "dateformat";
import {
  getProfileName,
  getRequisitionTypeTitle,
  getYesOrNo,
} from "../../data/helper/helpers";

const mapStateToProps = (state) => ({
  requisitionDetails: state.candidateRequest.get("requisitionDetails").toJS(),
  candidateDetails: state.candidateRequest.get("candidateDetails").toJS(),
  additionalInformation: state.candidateRequest
    .get("additionalInformation")
    .toJS(),
});

const CandidateRequestSummary = ({
  review,
  requisitionDetails,
  candidateDetails,
  additionalInformation,
}) => {
  const {
    requisitionType,
    startDate,
    hiringManager,
    businessUnit,
    department,
    location,
    employeeType,
  } = requisitionDetails || {};
  const {
    firstName,
    lastName,
    username,
    nonLpEmail,
    job,
    selectedCompany,
    officeNumber,
    mobileNumber,
  } = candidateDetails || {};
  const {selectedDevice, isGoogleAccountNeeded} = additionalInformation || {};

  return (
    <PaperCardWrapper>
      <Box>
        <SummaryTopTypography>
          {review ? "Review & Confirm Request" : "Request Completed"}
        </SummaryTopTypography>
      </Box>

      <RequestSummarySection title="Requisition Details">
        <RequestSummaryItem
          name="Requisition Type"
          value={getRequisitionTypeTitle(requisitionType)}
        />
        <RequestSummaryItem
          name="Start Date"
          value={dateFormat(`${startDate}T00:00`, "mmmm d, yyyy")}
        />
        <RequestSummaryItem
          name="Hiring Manager"
          value={getProfileName(hiringManager)}
        />
        <RequestSummaryItem name="Business Unit" value={businessUnit} />
        <RequestSummaryItem name="Department" value={department} />
        <RequestSummaryItem
          name="Location"
          value={`${location?.locationDescription} (${location?.locationCode})`}
        />
        <RequestSummaryItem name={"Employee Type"} value={employeeType} />
      </RequestSummarySection>

      <RequestSummarySection title="Candidate Details">
        <RequestSummaryItem
          name="First and Last Name"
          value={getProfileName({firstName, lastName})}
        />
        <RequestSummaryItem name="Username" value={username} />
        <RequestSummaryItem name="Email" value={nonLpEmail} />
        <RequestSummaryItem
          name="Job"
          value={job?.jobCode + " | " + job?.jobTitle}
        />
        <RequestSummaryItem name="Company" value={selectedCompany} />
        <RequestSummaryItem
          name="Office number"
          value={officeNumber?.length > 0 ? officeNumber : "n/a"}
        />
        <RequestSummaryItem
          name="Mobile Number"
          value={mobileNumber?.length > 0 ? mobileNumber : "n/a"}
        />
      </RequestSummarySection>

      <RequestSummarySection title="Additional Information">
        <RequestSummaryItem
          name="Google Account Needed"
          value={getYesOrNo(isGoogleAccountNeeded)}
        />
        <RequestSummaryItem
          name="Device Requested"
          value={
            selectedDevice?.length > 0 ? selectedDevice : "No device selected"
          }
        />
      </RequestSummarySection>
    </PaperCardWrapper>
  );
};

export default connect(mapStateToProps)(memo(CandidateRequestSummary));
