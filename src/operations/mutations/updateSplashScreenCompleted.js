import {gql} from "@apollo/client";

export const UPDATE_SPLASH_SCREEN_COMPLETED = gql`
  mutation UpdateSplashScreenCompleted(
    $id: String
    $type: String
    $bool: Boolean
  ) {
    updateSplashScreenCompleted(id: $id, type: $type, bool: $bool) {
      id
      firstName
      lastName
      userName
      splashScreenCompleted
    }
  }
`;
