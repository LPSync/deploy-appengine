import { gql } from "@apollo/client";

export const GET_ACLOUDGURU_LICENSE = gql`
  query GetACloudGuruLicense($search: String!) {
    get_acloudguru_license(search: $search) {
      ok
    }
  }
`;
