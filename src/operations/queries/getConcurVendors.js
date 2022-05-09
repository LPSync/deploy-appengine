import { gql } from "@apollo/client";

export const GET_CONCUR_VENDORS = gql`
  query getConcurVendors($search: [String]!) {
    get_concur_vendors(search: $search) {
      id
      companyName
    }
  }
`;
