import {gql} from "@apollo/client";

export const GET_LOCATION_COORDINATES = gql`
  query GetLocationPrediction($search: String) {
    get_location_coordinates(search: $search){
      lat
      lng  
    }
  }
`;
