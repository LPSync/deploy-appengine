import { gql } from "@apollo/client";

export const REMOVE_ROLE_USER = gql`
  mutation RemoveRoleUser($roleId: String!, $userId: String!) {
    removeRoleUser(roleId: $roleId, userId: $userId) {
      roleId
      userId
    }
  }
`;
