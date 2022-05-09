import { gql } from "@apollo/client";

export const GET_USERS_TOTALS_BY_CONTRACTOR_COMPANY = gql`
  query GetUsersTotalsByContractorCompany($search: String!) {
    get_users_totals_by_contractor_company(search: $search)
  }
`;
