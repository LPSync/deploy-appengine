import { gql } from "@apollo/client";

export const GET_THIRD_PARTIES = gql`
  query GetThirdParties($filters: ThirdPartyFiltersInput) {
    get_third_parties(filters: $filters) {
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
