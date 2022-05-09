import { gql } from "@apollo/client";

export const GET_ALL_TASKS_TOTALS = gql`
  query GetAllTasksTotals {
    get_all_tasks_totals {
      pendingApproval
      scheduled
      inProgress
    }
  }
`;
