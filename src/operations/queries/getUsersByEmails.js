import { gql } from "@apollo/client";

export const GET_USERS_BY_EMAILS = gql`
  query GetUsersByEmails($search: [String]!) {
    get_users_by_emails(search: $search) {
      id
      status
      profile {
        businessUnit
        companyName
        costCenter
        department
        email
        employeeNumber
        employeeSince
        employeeType
        firstName
        jobTitle
        lastName
        location
        manager
        managerEmail
        mobilePhone
        primaryPhone
        originalHireDate
        userName
      }
    }
  }
`;
