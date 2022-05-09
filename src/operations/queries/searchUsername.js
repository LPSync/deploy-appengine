import { gql } from "@apollo/client";

export const SEARCH_USERNAME = gql`
  query SearchUsername($search: String!) {
    search_username(search: $search) {
      status
      username
    }
  }
`;
