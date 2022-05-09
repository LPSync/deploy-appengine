import {gql} from "@apollo/client";

export const GET_ALL_OFFBOARDING_TASKS = gql`
  query GetAllOffboardingTasks($filters: FiltersInput) {
    get_all_offboarding_tasks(filters: $filters) {
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
      taskApprovals {
        id
        approvalStage
        approvalStatus
        approvalDateTime
        approvalUsername
        approvalFirstName
        approvalLastName
        approvalEmail
        approvalNote
      }
      offboardingTask {
        id
        offboardUsername
        offboardFirstName
        offboardLastName
      }
    }
  }
`;
