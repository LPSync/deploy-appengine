import { gql } from "@apollo/client";

export const GET_COST_CENTERS = gql`
  query GetCostCenters {
    get_cost_centers {
      id
      costCenterCategory
      costCenterCode
      costCenterDescription
    }
  }
`;
