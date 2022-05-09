import {gql} from "@apollo/client";

export const GET_CANDIDATE_PORTAL_LAPTOP_SETTINGS = gql`
    query GetCandidatePortalSettings {
        get_candidate_portal_laptops {
            id
            laptopType
            laptopLanguage
            laptopAvailability
        }
    }
`;
