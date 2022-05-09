import React, {memo} from "react";
import TotalsBox from "./TotalsBox";
import {useQuery} from "@apollo/client";
import {GET_ALL_AUTH_ONBOARDING_TOTALS} from "../../../operations/queries/getAllAuthOnboardingTotals";
import {connect} from "react-redux";

const statuses = [
  {id: "pendingApproval", name: "Pending Approval"},
  {id: "scheduled", name: "Scheduled"},
  {id: "rejected", name: "Rejected"},
  {id: "completed", name: "Completed"}
];

const useGetAllAuthOnboardingTotals = (config, handleComplete) => useQuery(GET_ALL_AUTH_ONBOARDING_TOTALS, {
  ...config,
  onCompleted: (data) => {
    handleComplete(data?.get_all_auth_onboarding_totals);
  }
});

const CandidateTotals = ({isCandidateSubmitted}) => {

  return (
    <TotalsBox
      title="Candidate Requests"
      statuses={statuses}
      isSubmitted={isCandidateSubmitted}
      executeFunc={useGetAllAuthOnboardingTotals}
    />
  );
};

export default connect(state => ({
  isCandidateSubmitted: state.onboardingDashboard.get("isCandidateSubmitted")
}), {})
(memo(CandidateTotals));
