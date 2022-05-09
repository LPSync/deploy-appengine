import React, { memo, useContext } from "react";
import { RequisitionRequestContext } from "./RequisitionRequestContextProvider";
import PaperCardWrapper from "../../components/PaperCardWrapper";
import RequestSummaryItem from "../../components/requestWrapper/RequestSummaryItem";
import RequestSummarySection from "../../components/requestWrapper/RequestSummarySection";
import dateFormat from "dateformat";
import RequestTopBox from "../../components/blocks/RequestTopBox";

const RequestSummary = ({ review }) => {
  const {
    requisitionType,
    plannedStartDate,
    selectedManager,
    selectedBusinessUnit,
    selectedDepartment,
    location,
    isBackfillChecked,
    selectedBackfill,
    selectedCompanyCode,
    selectedParentMgmtCostCenter,
    selectedMgmtCostCenter,
    selectedFunctionalAreaDesc,
    selectedCountryDesc,
    jobCode,
    jobTitle,
    selectedReqSpendCurrency,
    reqSpendAmount,
    selectedReqSpendPeriod,
    reqBonusAmount,
    selectedReqBonusType,
    reqCommissionAmount,
    selectedReqCommissionCurrency,
    contractMonths,
    contractHours,
    comments,
  } = useContext(RequisitionRequestContext);

  return (
    <PaperCardWrapper>
      <RequestTopBox
        review={review}
        reviewText="Review Requisition Request"
        summaryText="Requisition Request Summary"
      />

      <RequestSummarySection title="Requisition Details">
        <RequestSummaryItem name="Requisition Type" value={requisitionType} />
        <RequestSummaryItem
          name="Start Date"
          value={dateFormat(`${plannedStartDate}T00:00`, "mmmm d, yyyy")}
        />
        <RequestSummaryItem
          name="Hiring Manager"
          value={selectedManager?.profile?.email}
        />
        <RequestSummaryItem
          name="Business Unit"
          value={selectedBusinessUnit?.businessUnit}
        />
        <RequestSummaryItem
          name="Department"
          value={selectedDepartment?.department}
        />
        <RequestSummaryItem
          name="Location"
          value={`${location?.description} (${location?.locationCode})`}
        />
        <RequestSummaryItem
          name="Backfill?"
          value={isBackfillChecked ? "yes" : "no"}
        />
        {isBackfillChecked && (
          <RequestSummaryItem
            name="Selected Backfill"
            value={
              selectedBackfill?.firstName +
              " " +
              selectedBackfill?.lastName +
              " | " +
              selectedBackfill?.userName
            }
          />
        )}
      </RequestSummarySection>

      <RequestSummarySection title="Cost Center">
        <RequestSummaryItem
          name="Requisition Cost Center"
          value={[
            selectedCompanyCode?.costCenterCode,
            selectedParentMgmtCostCenter?.costCenterCode,
            selectedMgmtCostCenter?.costCenterCode,
            selectedFunctionalAreaDesc?.costCenterCode,
            selectedCountryDesc?.costCenterCode,
            "00",
          ].join("-")}
        />
      </RequestSummarySection>

      <RequestSummarySection title="Job/Finance Details">
        <RequestSummaryItem
          name="Job Code"
          value={jobCode + " | " + jobTitle}
        />
        <RequestSummaryItem
          name="Requisition Spend"
          value={[
            selectedReqSpendCurrency?.AlphabeticCode,
            reqSpendAmount,
            selectedReqSpendPeriod,
          ].join(" ")}
        />
        <RequestSummaryItem
          name="Requisition Bonus"
          value={
            reqBonusAmount
              ? `${reqBonusAmount} ${selectedReqBonusType}`
              : "not entered"
          }
        />
        <RequestSummaryItem
          name="Requisition Commission"
          value={
            reqCommissionAmount
              ? `${reqCommissionAmount} ${selectedReqCommissionCurrency?.AlphabeticCode}`
              : "not entered"
          }
        />
        <RequestSummaryItem
          name="Contract Length"
          value={`${contractMonths || ""} Months; ${
            contractHours || ""
          } Hours per Week`}
        />
        <RequestSummaryItem
          name="Comments"
          value={comments?.length > 0 ? comments : "not entered"}
        />
      </RequestSummarySection>
    </PaperCardWrapper>
  );
};

export default memo(RequestSummary);
