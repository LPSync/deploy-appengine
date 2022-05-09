import {gql} from "@apollo/client";

export const DELETE_AUTH_USER_BADGE = gql`
  mutation DeleteAuthUserBadge($badgeId: Int!) {
    deleteAuthUserBadge(badgeId: $badgeId) {
      badgeId
      userId
    }
  }
`;
