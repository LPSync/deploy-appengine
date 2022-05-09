import { gql } from "@apollo/client";

export const CREATE_FEEDBACK = gql`
  mutation CreateFeedback($input: LpsyncFeedbackInput) {
    createFeedback(input: $input) {
      id
      name
      email
      feedback
    }
  }
`;
