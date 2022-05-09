import { gql } from "@apollo/client";

export const GET_ALL_AUTH_ONBOARDING_TOTALS = gql`
  query GetAllAuthOnboardingTotals {
    get_all_auth_onboarding_totals {
      pendingApproval
      rejected
      scheduled
      completed
    }
  }
`;
