import { gql } from "@apollo/client";

export const UPDATE_TASK_NOTIFICATION_DATE = gql`
  mutation UpdateTaskNotificationDate($id: Int!) {
    updateTaskNotificationDate(id: $id) {
      id
    }
  }
`;
