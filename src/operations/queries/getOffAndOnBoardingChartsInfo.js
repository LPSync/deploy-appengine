import {gql} from "@apollo/client";

export const GET_OFF_AND_ON_BOARDING_CHARTS_INFO = gql`
    query GetOffAndOnBoardingChartsInfo {
        get_off_and_on_boarding_charts_info {
            onboarding {
                last7days {
                    labels
                    data
                }
                last30days {
                    labels
                    data
                }
                last90days {
                    labels
                    data
                }
                currentYear {
                    labels
                    data
                }
            }
            offboarding {
                last7days {
                    labels
                    data
                }
                last30days {
                    labels
                    data
                }
                last90days {
                    labels
                    data
                }
                currentYear {
                    labels
                    data
                }
            }
        }
    }
`;
