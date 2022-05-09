import {gql} from "@apollo/client";

export const GET_REQUISITION_TASKS_CHARTS_INFO = gql`
    query GetRequisitionTasksChartsInfo {
        get_requisition_tasks_charts_info {
            last30days {
                labels
                data
                requisitionTypes
            }
            currentYear {
                labels
                data
                requisitionTypes
            }
            open {
                labels
                data
                requisitionTypes
            }
        }
    }
`;
