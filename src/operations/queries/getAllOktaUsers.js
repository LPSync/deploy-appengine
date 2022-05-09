import { gql } from "@apollo/client";

export const GET_ALL_OKTA_USERS = gql`
  query GetAllOktaUsers {
    get_all_okta_users {
      id
      email
      employeeNumber
      employeeType
      department
      firstName
      jobTitle
      lastName
      location
      managerOktaId
      managerEmail
      managerEmployeeNumber
      photo
      userName
      totalDirectReports
      totalFullTimeDirects
      totalContractorDirects
      totalPartnerDirects
    }
  }
`;
