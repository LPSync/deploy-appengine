import { gql } from "@apollo/client";

export const ADD_ROLE_USER = gql`
  mutation AddRoleUser($roleId: String!, $userId: String!) {
    addRoleUser(roleId: $roleId, userId: $userId) {
      roleId
      userId
    }
  }
`;
