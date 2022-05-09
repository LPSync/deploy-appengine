import {gql} from "@apollo/client";

export const CREATE_BADGE_REQUEST_TASK = gql`
  mutation CreateBadgeRequestTask($input: LpsyncTaskInput, $file: Upload) {
    createBadgeRequestTask(input: $input, file: $file) {
      id
    }
  }
`;
