import { gql } from "@apollo/client";

export const GET_CANDIDATE_TASKS_FOR_ADMIN_CANDIDATE_PORTAL_ACCESS = gql`
    query GetCandidateNonFteTasks {
        get_candidate_tasks {
            id
            taskType
            disabled
            candidateFirstName
            candidateLastName
            candidateNonLpEmail
            lastLoginAt
        }
    }
`;
