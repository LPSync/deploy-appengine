import {gql} from "@apollo/client";

export const UPDATE_LPSYNC_BADGE = gql`
  mutation UpdateLpsyncBadge(
    $id: Int!
    $badgeIcon: String
    $badgeName: String
  ) {
    updateLpsyncBadge(id: $id, badgeIcon: $badgeIcon, badgeName: $badgeName) {
      badgeType
      badgeIcon
      badgeName
    }
  }
`;
