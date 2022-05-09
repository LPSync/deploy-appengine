import { gql } from "@apollo/client";

export const GET_VIEWED_THIRD_PARTIES = gql`
  query GetViewedThirdParties($filters: PageFilters) {
      get_viewed_third_parties(filters: $filters) {
        id
        code
        name
        altName
        type
        owner
        status
        contactFirstName
        contactLastName
        contactEmail
        ownerFirstName
        ownerLastName
    }
  }
`;
