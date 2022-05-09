import {gql} from "@apollo/client";

const USER_DATA_FIELDS = gql`
  fragment UserDataFields on User {
    id
    status
    profile {
      businessUnit
      costCenter
      department
      displayName
      email
      employeeNumber
      employeeType
      firstName
      jobTitle
      lastName
      location
      manager
      userName
    }
  }
`;

export const SEARCH_USERS_QUERY = gql`
  ${USER_DATA_FIELDS}
  query SearchUsersQuery($search: String!) {
    search_users(search: $search) {
      ...UserDataFields
    }
  }
`;

export const SEARCH_NFTE_USERS_QUERY = gql`
    ${USER_DATA_FIELDS}
    query SearchNfteUsersQuery($search: String!) {
    search_nfte_users(search: $search) {
      ...UserDataFields
    }
  }
`;
