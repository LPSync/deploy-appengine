import { gql } from "@apollo/client";

export const GET_GOOGLE_CLOUD_SCHEDULER_TASKS = gql`
    query GetGoogleCloudSchedulerTasks {
        get_google_cloud_scheduler_tasks {
            name,
            description,
            state,
            lastAttemptTime,
            schedule
        }
    }
`;
