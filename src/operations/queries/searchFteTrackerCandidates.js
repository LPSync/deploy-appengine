import {gql} from "@apollo/client";

export const SEARCH_FTE_TRACKER_CANDIDATES = gql`
  query SearchFteTrackerCandidates($search: String!, $skip: Int, $take: Int) {
    search_fte_tracker_candidates(search: $search, skip: $skip, take: $take) {
      id
      created
      location
      username
      firstName
      lastName
      oktaStatus
      laptopType
      laptopLanguage
      FTETracker_id
      trackingNumber
      trackingProvider
      nonLpEmail
      department
      postalAddress
      phoneNumber
      businessUnit
      candidateStatus
    }
  }
`;
