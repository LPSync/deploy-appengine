import {gql} from "@apollo/client";

export const ADD_AUTH_USER_BADGES = gql`
  mutation AddAuthUserBadges($input: [LpsyncUsersAndBadgesInput]) {
    addAuthUserBadges(input: $input) {
      badgeId
    }
  }
`;
