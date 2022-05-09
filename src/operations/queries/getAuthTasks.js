import {gql} from "@apollo/client";

export const GET_AUTH_TASKS = gql`
  query GetAuthTasks {
    get_auth_tasks {
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
