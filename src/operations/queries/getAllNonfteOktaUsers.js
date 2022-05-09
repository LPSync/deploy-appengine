import {gql} from "@apollo/client";

export const GET_ALL_NONFTE_OKTA_USERS = gql`
  query GetAllNonfteOktaUsers {
    get_all_nonfte_okta_users {
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
      oktaLastLogin
    }
  }
`;
