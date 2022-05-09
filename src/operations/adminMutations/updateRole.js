import { gql } from "@apollo/client";

export const UPDATE_ROLE = gql`
  mutation UpdateRole($id: String!, $roleTitle: String, $roleDescription: String) {
    updateRole(id: $id, roleTitle: $roleTitle, roleDescription: $roleDescription) {
      id
      roleTitle,
      roleDescription
    }
  }
`;
