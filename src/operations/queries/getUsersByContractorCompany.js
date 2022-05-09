import { gql } from "@apollo/client";

export const GET_USERS_BY_CONTRACTOR_COMPANY = gql`
  query GetUsersByContractorCompany($filters: FilterQuery!) {
    get_users_by_contractor_company(filters: $filters) {
      id
      lastLogin
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
        mobilePhone
        primaryPhone
        userName
      }
    }
  }
`;
