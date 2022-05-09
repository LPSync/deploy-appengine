import { gql } from "@apollo/client";

export const GET_THIRD_PARTY_BY_CODE = gql`
  query GetThirdPartyByCode($search: String!) {
    get_third_party_by_code(search: $search) {
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
