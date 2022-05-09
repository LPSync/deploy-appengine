import { gql } from "@apollo/client";

export const GET_ROLES = gql`
  query GetRoles {
    get_roles {
      id
      roleTitle
      roleDescription
      roleLocked
      permissions {
        permission {
          id
          permissionTitle
          permissionDescription
        }
      }
      users {
        user {
          id
          userFirstName
          userLastName
          lastLogin
        }
      }
    }
  }
`;
