import {gql} from "@apollo/client";

export const SEARCH_USERS_BY_BADGES_QUERY = gql`
  query SearchUsersByBadgesQuery($search: SearchBadgesInput!) {
    search_users_by_badges(search: $search) {
      id
      status
      profile {
        firstName
        lastName
        userName
        email
        employeeType
        employeeNumber
        jobTitle
        location
        businessUnit
        department
        costCenter
      }
    }
  }
`;

export const SEARCH_USERS_FOR_SPLASH_SCREEN_SETTINGS = gql`
  query SearchUsersForSplashScreenSettings($search: String!) {
    search_users_for_splash_screen_settings(search: $search) {
      id
      firstName
      lastName
      userName
      splashScreenCompleted
    }
  }
`;
