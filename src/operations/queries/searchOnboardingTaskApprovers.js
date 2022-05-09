import { gql } from "@apollo/client";

export const SEARCH_ONBOARDING_TASK_APPROVERS = gql`
  query SearchOnboardingTaskApprovers {
    search_onboarding_task_approvers {
      id
      approverEmail
      approverFirstName
      approverLastName
      approverStagePermission
    }
  }
`;
