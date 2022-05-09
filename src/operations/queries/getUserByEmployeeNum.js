import { gql } from "@apollo/client";

export const GET_USER_BY_EMPLOYEE_NUM = gql`
  query GetUserByEmployeeNum($search: String!) {
    get_user_by_employee_num(search: $search) {
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
        memberOf
        mobilePhone
        primaryPhone
        userName
      }
    }
  }
`;
