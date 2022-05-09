import { gql } from "@apollo/client";

export const CREATE_LOG_ENTRY = gql`
  mutation CreateLogEntry($input: LpsyncLogInput) {
    createLogEntry(input: $input) {
      logType
      logNotification
      logDescription
    }
  }
`;
