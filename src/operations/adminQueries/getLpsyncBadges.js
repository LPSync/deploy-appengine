import {gql} from "@apollo/client";

export const GET_LPSYNC_BADGES = gql`
  query GetLpsyncBadges($filters: BadgeNamesInput) {
    get_lpsync_badges(filters: $filters) {
      id
      badgeIconId
      badgeType
      badgeName
      users {
        user {
          id
        }
      }
      badgeIcon {
        id
        badgeIconName
        badgeIconImg
      }
    }
  }
`;
