import {gql} from "@apollo/client";

export const GET_BADGE_RULES = gql`
  query GetBadgeRules($filters: BasicFiltersInput) {
    get_badge_rules(filters: $filters) {
      id
      ruleName
      criteriaFieldValue
      criteriaFilter
      criteriaInputValue
      badges {
        badge {
          id
          badgeIconId
          badgeType
          badgeName
          badgeIcon {
            badgeIconImg
          }
        }
      }
    }
  }
`;
