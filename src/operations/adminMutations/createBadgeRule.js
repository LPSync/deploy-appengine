import {gql} from "@apollo/client";

export const CREATE_BADGE_RULE = gql`
  mutation CreateBadgeRule($input: BadgeRuleInput) {
    createBadgeRule(input: $input) {
      ruleName
      criteriaFieldValue
      criteriaFilter
      criteriaInputValue
    }
  }
`;
