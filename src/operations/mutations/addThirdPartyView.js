import { gql } from "@apollo/client";

export const ADD_THIRD_PARTY_VIEW = gql`
  mutation AddThirdPartyView(
    $thirdPartyId: Int!
    $username: String
  ) {
      addThirdPartyView(
      thirdPartyId: $thirdPartyId
      username: $username
      ){
      thirdPartyId
      username 
     }
  }
`;
