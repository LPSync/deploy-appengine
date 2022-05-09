import { gql } from "@apollo/client";

export const CREATE_HRTERMINATION_CODE = gql`
  mutation CreateHRTerminationCode($input: HRTerminationCodeInput) {
    createHRTerminationCode(input: $input) {
      terminationCode
    }
  }
`;
