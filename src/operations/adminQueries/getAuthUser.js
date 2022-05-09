import { gql } from "@apollo/client";

export const GET_AUTH_USER = gql`
  query GetAuthUser {
    get_auth_user {
      id
      profile {
        businessUnit
        companyName
        department
        email
        employeeNumber
        employeeType
        firstName
        jobTitle
        lastName
        location
        userName
      }
    }
  }
`;
