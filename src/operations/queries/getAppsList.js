import { gql } from "@apollo/client";

export const GET_APPS_LIST = gql`
  query GetAppsList($search: String) {
    get_apps_list(search: $search) {
      id
      label
      totalCount
    }
  }
`;
