import { gql } from "@apollo/client";

export const GET_TIME_ZONE = gql`
  query GetTimeZone($search: Int!) {
    get_time_zone(search: $search) {
      dstOffset
      rawOffset
      timeZoneId
      timeZoneName
    }
  }
`;
