import {gql} from "@apollo/client";

export const GET_LPSYNC_USER_BADGES = gql`
  query GetLpsyncUserBadges($user: String) {
    get_lpsync_user_badges(user: $user) {
      user {
        id
        userEmail
      }
      badge {
        id
        badgeType
        badgeName
        badgeIcon {
          badgeIconImg
          badgeIconName
        }
      }
      rank
    }
  }
`;
