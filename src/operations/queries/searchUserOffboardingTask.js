import {gql} from "@apollo/client";

export const SEARCH_USER_OFFBOARDING_TASK = gql`
  query SearchUserOffboardingTask($search: String!) {
    search_user_offboarding_task(search: $search) {
      id
      oldTaskId
      taskType
      taskStatus
    }
  }
`;
