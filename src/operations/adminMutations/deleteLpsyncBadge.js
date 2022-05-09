import {gql} from "@apollo/client";

export const DELETE_LPSYNC_BADGE = gql`
  mutation DeleteLpsyncBadge($id: Int!) {
    deleteLpsyncBadge(id: $id) {
      id
    }
  }
`;
