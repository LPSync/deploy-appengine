import { gql } from "@apollo/client";

export const GET_JAMF_DEVICES = gql`
  query GetJamfDevices($search: String!) {
    get_jamf_devices(search: $search) {
      id
      username
      model
      serialNumber
      deviceName
      isChecked
    }
  }
`;
