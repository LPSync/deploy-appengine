import { gql } from "@apollo/client";

export const GET_AUTH_ONBOARDING_TASKS = gql`
  query GetAuthOnboardingTasks($filters: FiltersInput) {
    get_auth_onboarding_tasks(filters: $filters) {
      id
      oldTaskId
      taskType
      taskCreatedDateTime
      taskCreatorUsername
      taskCreatorFirstName
      taskCreatorLastName
      taskStatus
      taskScheduleType
      taskScheduleDateTime
      taskScheduleTimezone
      taskSendNotification
      taskEndDate
      taskApprovalStatus
      onboardingTask {
        id
        onboardFirstName
        onboardLastName
        onboardEmployeeType
        onboardJobTitle
      }
    }
  }
`;
