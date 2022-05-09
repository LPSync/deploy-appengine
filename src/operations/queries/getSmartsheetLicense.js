import { gql } from "@apollo/client";

export const GET_SMARTSHEET_LICENSE = gql`
  query GetSmartsheetLicense($search: String!) {
    get_smartsheet_license(search: $search) {
      ok
    }
  }
`;
