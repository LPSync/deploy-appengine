import {gql} from "@apollo/client";

export const GET_SERVICE_NOW_USER_GROUPS = gql`
  query GetServiceNowUserGroups($search: String!) {
    get_service_now_user_groups(search: $search) {
      groupsManage {
        id
        parentGroup
        manager
        name
        unitLeader
        createdOn
      }
      groupsMembership {
        id
        createdOn
        createdBy
        name
      }
    }
  }
`;
