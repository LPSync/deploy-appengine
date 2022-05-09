import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($search: String!) {
    get_user_by_email(search: $search) {
      id
      lastLogin
      status
      totalCount
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
        memberOf
        mobilePhone
        originalHireDate
        primaryPhone
        userName
      }
    }
  }
`;
