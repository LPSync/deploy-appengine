import { gql } from "@apollo/client";

export const GET_TEAM_NONFTE_DIRECT_REPORTS = gql`
  query GetTeamNonfteDirectReports {
    get_team_nonfte_direct_reports {
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
