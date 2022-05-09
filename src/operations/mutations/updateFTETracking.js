import {gql} from "@apollo/client";

export const UPDATE_FTE_TRACKING = gql`
  mutation UpdateFteTracking($id: Int!, $provider: String!, $number: String!) {
    updateFteTracking(id: $id, provider: $provider, number: $number) {
      trackingProvider
      trackingNumber
      candidateUsername
      candidateStatus
    }
  }
`;
