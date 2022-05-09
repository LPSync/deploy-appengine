import { gql } from "@apollo/client";

export const GET_BACKFILL_DIRECT_REPORTS = gql`
  query GetBackfillDirectReports($search: String!) {
    get_backfill_direct_reports(search: $search) {
      id
      totalCount
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
