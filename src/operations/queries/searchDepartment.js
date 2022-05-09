import { gql } from "@apollo/client";

export const SEARCH_DEPARTMENT = gql`
  query SearchDepartment($search: String!) {
    search_department(search: $search) {
      department
    }
  }
`;
