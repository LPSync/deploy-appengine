import { gql } from "@apollo/client";

export const FILTER_BY_STATUS = gql`
  query FilterByStatus($filter: String!) {
    filter_by_status(filter: $filter) {
      id
      profile {
        department
        email
        employeeNumber
        firstName
        jobTitle
        lastName
      }
    }
  }
`;
