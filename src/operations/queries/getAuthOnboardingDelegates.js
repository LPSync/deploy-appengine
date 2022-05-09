import { gql } from "@apollo/client";

export const GET_AUTH_ONBOARDING_DELEGATES = gql`
  query GetAuthOnboardingDelegates {
    get_auth_onboarding_delegates {
      id
      userName
      onboardingDelegates {
        id
        delegateCompany
        delegateTo
      }
    }
  }
`;
