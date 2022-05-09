import { gql } from "@apollo/client";

export const GET_REQUISITION_JOB_CODE = gql`
  query GetRequisitionJobCode($search: String!) {
    get_requisition_job_code(search: $search) {
        id
        USJobCode
        IntJobCode
        typeName
    }
  }
`;
