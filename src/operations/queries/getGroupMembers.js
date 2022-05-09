import {gql} from "@apollo/client";

export const GET_GROUP_MEMBERS = gql`
  query GetGroupMembers($group: String!) {
    get_group_members(group: $group) {
      id
      photo
      firstName
      lastName
      jobTitle
      userName
    }
  }
`;
