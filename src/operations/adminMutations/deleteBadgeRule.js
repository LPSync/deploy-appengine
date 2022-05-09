import {gql} from "@apollo/client";

export const DELETE_BADGE_RULE = gql`
  mutation DeleteBadgeRule($id: Int!) {
    deleteBadgeRule(id: $id) {
      id
    }
  }
`;
