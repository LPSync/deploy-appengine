import { gql } from "@apollo/client";

export const SEARCH_USER_DIRECTORY = gql`
  query SearchUserDirectory($search: SearchInput!) {
    search_user_directory(search: $search) {
      id
      status
      profile {
        firstName
        lastName
        userName
        email
        employeeType
        employeeNumber
        jobTitle
        location
        businessUnit
        department
      }
    }
  }
`;
