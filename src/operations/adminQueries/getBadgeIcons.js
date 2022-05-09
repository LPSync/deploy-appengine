import {gql} from "@apollo/client";

export const GET_BADGE_ICONS = gql`
  query GetBadgeIcons($filters: BasicFiltersInput) {
    get_badge_icons(filters: $filters) {
      id
      badgeIconImg
      badgeIconName
    }
  }
`;
