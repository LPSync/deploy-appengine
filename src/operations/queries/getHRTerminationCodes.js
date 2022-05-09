import { gql } from "@apollo/client";

export const GET_HRTERMINATION_CODES = gql`
  query GethRTerminationCodes {
    get_hrtermination_codes {
      id
      terminationCode
    }
  }
`;
