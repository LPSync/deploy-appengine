import { gql } from "@apollo/client";

export const GET_ROLES_PERMISSIONS = gql`
  query GetRolesPermissions {
    get_roles_permissions {
      role {
        id
        roleTitle
        roleDescription
        roleLocked
      }
      roleId
      permission {
        id
        permissionTitle
        permissionDescription
      }
      permissionId
    }
  }
`;
