import {gql} from "@apollo/client";

export const CHECK_IF_BADGE_ICON_EXISTS = gql`
  query CheckIfBadgeIconExists($iconName: String) {
    check_if_badge_icon_exists(iconName: $iconName) {
      id
      badgeIconName
    }
  }
`;
