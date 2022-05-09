import { gql } from "@apollo/client";

export const DELETE_ROLE_PERMISSION = gql`
  mutation DeleteRolePermission($roleId: String!, $permissionId: String!) {
    deleteRolePermission(roleId: $roleId, permissionId: $permissionId) {
      roleId
      permissionId
    }
  }
`;
