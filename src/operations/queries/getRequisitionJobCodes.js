import { gql } from "@apollo/client";

export const GET_REQUISITION_JOB_CODES = gql`
  query GetRequisitionJobCodes {
    get_requisition_job_codes {
        id
        USJobCode
        IntJobCode
        typeName
    }
  }
`;
