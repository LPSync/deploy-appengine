import {gql} from "@apollo/client";

export const CHECK_IF_AUTH_SPLASH_SCREEN_COMPLETED = gql`
  query CheckIfAuthSplashScreenCompleted {
    check_if_auth_splash_screen_completed {
      splashScreenCompleted
    }
  }
`;
