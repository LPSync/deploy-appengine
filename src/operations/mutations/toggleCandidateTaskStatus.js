import { gql } from "@apollo/client";

export const TOGGLE_CANDIDATE_TASK_STATUS = gql`
    mutation ToggleCandidateTaskStatus($input: ToggleCandidateTaskStatusInput) {
        toggleCandidateTaskStatus(input: $input) {
            status
        }
    }
`;
