import { gql } from "@apollo/client";

export const SEARCH_GROUPS = gql`
  query SearchGroups($search: String!) {
    search_groups(search: $search) {
      id
      name
      description
    }
  }
`;
