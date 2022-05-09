import {gql} from "@apollo/client";

export const UPDATE_BADGE_RULE = gql`
  mutation UpdateBadgeRule($input: BadgeRuleInput) {
    updateBadgeRule(input: $input) {
      ruleName
      criteriaFieldValue
      criteriaFilter
      criteriaInputValue
    }
  }
`;
