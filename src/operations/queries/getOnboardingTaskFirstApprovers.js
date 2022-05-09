import { gql } from "@apollo/client";

export const GET_ONBOARDING_TASK_FIRST_APPROVERS = gql`
  query GetOnboardingTaskFirstApprovers {
    get_onboarding_task_first_approvers {
      id
      approverEmail
      approverFirstName
      approverLastName
      approverStagePermission
    }
  }
`;
