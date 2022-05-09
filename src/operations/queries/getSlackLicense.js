import { gql } from "@apollo/client";

export const GET_SLACK_LICENSE = gql`
  query GetSlackLicense($search: String!) {
    get_slack_license(search: $search) {
      ok
    }
  }
`;
