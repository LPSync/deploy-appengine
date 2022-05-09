import { gql } from "@apollo/client";

export const SEARCH_CONCUR_VENDORS = gql`
  query SearchConcurVendors($search: String!) {
    search_concur_vendors(search: $search) {
      id
      companyName
    }
  }
`;
