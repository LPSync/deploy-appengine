import { gql } from "@apollo/client";

export const GET_ULTI_BU_DEPT = gql`
  query GetUltiBUDept {
    get_ulti_bu_dept {
      id
      businessUnit
      department
    }
  }
`;
