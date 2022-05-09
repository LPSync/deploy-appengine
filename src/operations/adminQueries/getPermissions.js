import { gql } from "@apollo/client";

export const GET_PERMISSIONS = gql`
  query GetPermissions {
    get_permissions {
      id
      permissionTitle
      permissionDescription
    }
  }
`;
