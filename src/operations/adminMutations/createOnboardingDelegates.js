import { gql } from "@apollo/client";

export const CREATE_ONBOARDING_DELEGATES = gql`
  mutation CreateOnboardingDelegates(
    $user: String!
    $input: [OnboardingDelegateInput]
  ) {
    createOnboardingDelegates(user: $user, input: $input) {
      id
      userName
      onboardingDelegates {
        delegateCompany
        delegateTo
      }
    }
  }
`;
