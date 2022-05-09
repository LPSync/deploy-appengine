import { gql } from "@apollo/client";

export const GET_GOOGLE_USER_INFO = gql`
  query GetGoogleUserInfo($search: String!) {
    get_google_user_info(search: $search) {
      id
      lastLoginTime
      suspended
    }
  }
`;
