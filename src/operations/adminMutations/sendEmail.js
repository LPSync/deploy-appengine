import { gql } from "@apollo/client";

export const SEND_EMAIL = gql`
  mutation SendEmail($input: SendEmailInput) {
    sendEmail(input: $input) {
      sendTo
      subject
      body
    }
  }
`;
