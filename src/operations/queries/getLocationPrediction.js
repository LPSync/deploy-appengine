import {gql} from "@apollo/client";

export const GET_LOCATION_PREDICTION = gql`
  query GetLocationPrediction($search: String) {
    get_location_prediction(search: $search){
      description
      main_text
      secondary_text
      main_text_matched_substrings {
        length
        offset
      }
    }
  }
`;
