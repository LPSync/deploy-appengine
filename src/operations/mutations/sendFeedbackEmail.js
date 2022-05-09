import { gql } from "@apollo/client";

export const SEND_FEEDBACK_EMAIL = gql`
  mutation SendFeedbackEmail($input: SendEmailInput) {
    sendFeedbackEmail(input: $input) {
      body
    }
  }
`;
