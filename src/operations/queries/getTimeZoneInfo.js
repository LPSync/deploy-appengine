import {gql} from "@apollo/client";

export const GET_TIME_ZONE_INFO = gql`
  query GetTimeZoneInfo($latitude: Float, $longitude: Float, $date: String) {
    get_time_zone_info(
      latitude: $latitude
      longitude: $longitude
      date: $date
    ) {
      timeZoneId
      timeZoneName
      epochTime
    }
  }
`;
