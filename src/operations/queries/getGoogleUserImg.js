import { gql } from "@apollo/client";

export const GET_GOOGLE_USER_IMG = gql`
  query GetGoogleUserImg($search: String!) {
    get_google_user_img(search: $search) {
      id
      mimeType
      photoData
    }
  }
`;
