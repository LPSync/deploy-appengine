import { gql } from "@apollo/client";

export const GET_ULTI_LOCATIONS = gql`
  query GetUltiLocations {
    get_ulti_locations {
      id
      locationCode
      locationCountry
      locationCountryCode
      locationDescription
      locationRegion
    }
  }
`;
