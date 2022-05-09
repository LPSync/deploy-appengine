import { gql } from "@apollo/client";

export const GET_ULTI_LOCATION_DESCRIPTION = gql`
  query GetUltiLocationDescription($search: String!) {
    get_ulti_location_description(search: $search) {
      id
      locationCode
      locationCountry
      locationCountryCode
      locationDescription
      locationRegion
    }
  }
`;
