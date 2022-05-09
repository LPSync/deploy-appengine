import { gql } from "@apollo/client";

export const GET_GOOGLE_USER_ALIASES = gql`
  query GetGoogleUserAliases($search: String!) {
    get_google_user_aliases(search: $search) {
      alias
      isChecked
    }
  }
`;
