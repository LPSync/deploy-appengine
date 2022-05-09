import { gql } from "@apollo/client";

export const ADD_ULTI_BU_DEPT = gql`
    mutation addUltiBUDept($input: UltiBUDeptInput) {
        addUltiBUDept(input: $input) {
            department
            businessUnit
        }
    }
`;
