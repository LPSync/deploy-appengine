import { gql } from "@apollo/client";

export const GET_ULTI_JOB_DATA = gql`
  query GetUltiJobData {
    get_ulti_job_data {
      id
      jobCode
      jobTitle
    }
  }
`;
