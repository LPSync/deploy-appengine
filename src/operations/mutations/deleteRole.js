import { gql } from "@apollo/client";

export const DELETE_ROLE = gql`
  mutation DeleteRole($id: String!) {
    deleteRole(id: $id) {
      id
    }
  }
`;
