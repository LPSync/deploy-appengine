import { gql } from "@apollo/client";

export const DELETE_ONBOARDING_DELEGATE = gql`
  mutation DeleteOnboardingDelegate($id: Int!) {
    deleteOnboardingDelegate(id: $id) {
      id
    }
  }
`;
