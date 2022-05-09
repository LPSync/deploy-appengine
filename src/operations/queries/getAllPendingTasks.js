import {gql} from "@apollo/client";

export const GET_ALL_PENDING_TASKS = gql`
  query GetAllPendingTasks {
    get_all_pending_tasks {
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
