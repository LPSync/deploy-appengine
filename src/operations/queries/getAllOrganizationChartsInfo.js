import { gql } from "@apollo/client";

export const GET_ALL_ORGANIZATION_CHARTS_INFO = gql`
    query GetAllOrganizationChartsInfo {
        get_all_organization_charts_info {
            employeeType {
                labels,
                data
            }
            department {
                labels,
                data
            },
            location {
                labels,
                data
            }
        }
    }
`;
