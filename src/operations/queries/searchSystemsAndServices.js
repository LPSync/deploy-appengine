import {gql} from "@apollo/client";

export const SEARCH_SYSTEMS_AND_SERVICES = gql`
  query SearchSystemsAndServices($search: String!) {
    search_systems_and_services(search: $search) {
      id
      type
      category
      name
      tier
      description
      owner {
        email
        name
      }
      impact
      team
      flagId
      lastUpdated
      flag {
        id
        name
        colour
        description
      }
    }
  }
`;

export const GET_SERVICE_WITH_ID = gql`
  query GetServiceWithId($id: String!) {
    get_service_with_id(id: $id) {
      id
      type
      category
      name
      tier
      description
      impact
      team
      owner {
        email
        name
      }
      manager {
        email
        name
      }
      director {
        email
        name
      }
      changeApprover {
        email
        name
      }
      changeApproverBackup {
        email
        name
      }
      qaLead {
        email
        name
      }
      flagId
      lastUpdated
      flag {
        id
        name
        colour
        description
      }
      dependencies {
        id
        relId
        sysId
        name
        relationship
        sysService {
          tier
          type
          flag {
            id
            name
            colour
            description
          }
        }
      }
    }
  }
`;
