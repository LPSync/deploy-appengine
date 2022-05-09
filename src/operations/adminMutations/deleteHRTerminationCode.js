import { gql } from "@apollo/client";

export const DELETE_HRTERMINATION_CODE = gql`
  mutation DeleteHRTerminationCode($id: Int!) {
    deleteHRTerminationCode(id: $id) {
      id
    }
  }
`;
