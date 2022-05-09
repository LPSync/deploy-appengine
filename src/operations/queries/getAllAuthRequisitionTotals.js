import { gql } from "@apollo/client";

export const GET_ALL_AUTH_REQUISITION_TOTALS = gql`
  query GetAllAuthRequisitionTotals {
    get_all_auth_requisition_totals {
      pendingApproval
      rejected
      approvedUnfilled
    }
  }
`;
