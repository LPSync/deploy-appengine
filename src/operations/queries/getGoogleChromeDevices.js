import { gql } from "@apollo/client";

export const GET_GOOGLE_CHROME_DEVICES = gql`
  query GetGoogleChromeDevices($search: String!) {
    get_google_chrome_devices(search: $search) {
      deviceId
      serialNumber
      status
      annotatedUser
      model
      isChecked
    }
  }
`;
