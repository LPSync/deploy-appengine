import { gql } from "@apollo/client";

export const UPDATE_HRTERMINATION_CODE = gql`
  mutation UpdateHRTerminationCode($id: Int!, $terminationCode: String!) {
    updateHRTerminationCode(id: $id, terminationCode: $terminationCode) {
      id
      terminationCode
    }
  }
`;
