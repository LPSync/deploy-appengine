import {gql} from "@apollo/client";

export const UPDATE_USER_LAST_LOGIN = gql`
  mutation UpdateUserLastLogin {
    updateUserLastLogin {
      id
      firstName
      lastName
    }
  }
`;
