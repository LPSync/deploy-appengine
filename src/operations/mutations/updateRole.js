import { gql } from "@apollo/client";

export const UPDATE_ROLE = gql`
  mutation UpdateRole($id: String!, roleTile: String, roleDescription: String) {
    updateRole(id: $id, roleTitle: $roleTitle, roleDescription: $roleDescription) {
      roleId
      roleTitle,
      roleDescription
    }
  }
`;
