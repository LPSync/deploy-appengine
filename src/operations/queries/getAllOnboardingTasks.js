import {gql} from "@apollo/client";

export const GET_ALL_ONBOARDING_TASKS = gql`
  query GetAllOnboardingTasks($filters: FiltersInput) {
    get_all_onboarding_tasks(filters: $filters) {
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
