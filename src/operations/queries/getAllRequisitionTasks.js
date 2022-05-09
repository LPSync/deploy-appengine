import {gql} from "@apollo/client";

export const GET_ALL_REQUISITION_TASKS = gql`
  query GetAllRequisitionTasks($filters: FiltersInput) {
    get_all_requisition_tasks(filters: $filters) {
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
      requisitionTask {
        reqType
        reqStartDate
      }
    }
  }
`;
