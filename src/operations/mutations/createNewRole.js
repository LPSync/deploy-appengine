import { gql } from "@apollo/client";

export const CREATE_NEW_ROLE = gql`
  mutation CreateNewRole($input: LpsyncRoleInput) {
    createNewRole(input: $input) {
      id
      roleTitle
      roleDescription
      permissions {
        roleId
        permissionId
      }
    }
  }
`;
