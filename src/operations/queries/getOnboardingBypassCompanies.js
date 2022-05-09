import { gql } from "@apollo/client";

export const GET_ONBOARDING_BYPASS_COMPANIES = gql`
  query GetOnboardingBypassCompanies {
    get_onboarding_bypass_companies {
      id
      companyName
    }
  }
`;
