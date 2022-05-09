import { gql } from "@apollo/client";

export const GET_LOG_ENTRIES = gql`
  query GetLogEntries {
    get_log_entries {
      id
      userId
      logType
      logNotification
      logDateTime
      logDescription
    }
  }
`;
