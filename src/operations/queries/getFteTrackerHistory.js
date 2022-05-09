import {gql} from "@apollo/client";

export const GET_FTE_TRACKER_HISTORY = gql`
  query GetFteTrackerHistory($username: String!) {
    get_fte_tracker_history(username: $username) {
      id
      candidateUsername
      eventType
      eventNote
      eventDate
      eventTime
      associateUsername
      associateFirstName
      associateLastName
      associateEmail
    }
  }
`;
