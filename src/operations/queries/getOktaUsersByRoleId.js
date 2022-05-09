import {gql} from "@apollo/client";

export const GET_OKTA_USERS_BY_ROLE_ID = gql`
  query GetOktaUsersByRoleId(
    $id: String!
    $skip: Int!
    $take: Int!
    $search: String!
  ) {
    get_okta_users_by_role_id(
      id: $id
      skip: $skip
      take: $take
      search: $search
    ) {
      user {
        id
        firstName
        lastName
        lastLogin
        userName
      }
    }
  }
`;
