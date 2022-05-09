import {gql} from "@apollo/client";

export const CREATE_LPSYNC_BADGE = gql`
  mutation CreateLpsyncBadge($input: LpsyncBadgeInput, $file: Upload) {
    createLpsyncBadge(input: $input, file: $file) {
      id
    }
  }
`;
