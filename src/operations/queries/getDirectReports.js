import {gql} from "@apollo/client";

export const GET_DIRECT_REPORTS = gql`
  query GetDirectReports($search: String) {
    get_direct_reports(search: $search) {
      id
      totalCount
      profile {
        businessUnit
        companyName
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
  }
`;
