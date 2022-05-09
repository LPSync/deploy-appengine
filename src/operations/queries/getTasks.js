import {gql} from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks($filters: FiltersInput) {
    get_tasks(filters: $filters) {
      id
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
      offboardingTask {
        offboardFirstName
        offboardLastName
        offboardEmployeeType
      }
      onboardingTask {
        onboardFirstName
        onboardLastName
      }
      requisitionTask {
        reqType
        reqStartDate
      }
      badgeRequestTask {
        badgeRequestName
        badgeRequestType
      }
    }
  }
`;
