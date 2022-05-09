import { gql } from "@apollo/client";

export const GET_OWNED_THIRD_PARTIES = gql`
  query GetOwnedThirdParties($filters: PageFilters) {
    get_owned_third_parties(filters: $filters) {
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
