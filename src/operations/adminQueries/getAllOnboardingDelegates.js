import { gql } from "@apollo/client";

export const GET_ALL_ONBOARDING_DELEGATES = gql`
  query GetAllOnboardingDelegates {
    get_all_onboarding_delegates {
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
