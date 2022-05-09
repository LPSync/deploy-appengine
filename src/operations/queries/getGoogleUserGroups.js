import { gql } from "@apollo/client";

export const GET_GOOGLE_USER_GROUPS = gql`
  query GetGoogleUserGroups($search: String!) {
    get_google_user_groups(search: $search) {
      id
      email
      name
      description
      totalCount
    }
  }
`;
