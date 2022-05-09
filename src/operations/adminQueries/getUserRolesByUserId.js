import { gql } from "@apollo/client";

export const GET_USER_ROLES_BY_USER_ID = gql`
  query GetUserRolesByUserId {
    get_user_roles_by_user_id {
      role {
        roleTitle
        permissions {
          permissionId
        }
      }
      roleId
      userId
    }
  }
`;
