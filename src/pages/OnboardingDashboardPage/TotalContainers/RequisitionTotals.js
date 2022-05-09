import React, {memo} from "react";
import {useQuery} from "@apollo/client";
import {GET_ALL_AUTH_REQUISITION_TOTALS} from "../../../operations/queries/getAllAuthRequisitionTotals";
import TotalsBox from "./TotalsBox";
import {connect} from "react-redux";

const useGetAllAuthRequisitionTotals = (config, handleComplete) => useQuery(GET_ALL_AUTH_REQUISITION_TOTALS, {
  ...config,
  onCompleted: (data) => {
    handleComplete(data?.get_all_auth_requisition_totals);
  }
});

const statuses = [
  {id: "pendingApproval", name: "Pending Approval"},
  {id: "rejected", name: "Rejected"},
  {id: "approvedUnfilled", name: "Approved Unfilled"}
];

const RequisitionTotals = ({isReqSubmitted}) => {

  return (
    <TotalsBox
      title="Requisition Requests"
      statuses={statuses}
      isSubmitted={isReqSubmitted}
      executeFunc={useGetAllAuthRequisitionTotals}
    />
  );
};

export default connect(state => ({
  isReqSubmitted: state.onboardingDashboard.get("isReqSubmitted")
}), {})
(memo(RequisitionTotals));
