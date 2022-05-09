import {gql} from "@apollo/client";

export const CHECK_IF_BADGE_NAME_EXISTS = gql`
  query CheckIfBadgeNameExists($type: String, $badgeName: String) {
    check_if_badge_name_exists(type: $type, badgeName: $badgeName) {
      id
      badgeIconId
      badgeType
      badgeName
    }
  }
`;
