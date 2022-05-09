import { gql } from "@apollo/client";

export const ADD_TASK_APPROVAL = gql`
  mutation AddTaskApproval(
    $id: Int!
    $taskType: String
    $taskStatus: String
    $taskApprovalStatus: String
    $input: LpsyncTaskApprovalInput
  ) {
    addTaskApproval(
      id: $id
      taskType: $taskType
      taskStatus: $taskStatus
      taskApprovalStatus: $taskApprovalStatus
      input: $input
    ) {
      id
      taskStatus
      taskApprovalStatus
      taskApprovals {
        approvalStage
        approvalStatus
        approvalNote
      }
    }
  }
`;
