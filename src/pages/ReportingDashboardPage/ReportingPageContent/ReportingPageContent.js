import {Box} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_ALL_ORGANIZATION_CHARTS_INFO} from "../../../operations/queries/getAllOrganizationChartsInfo";
import {GET_OFF_AND_ON_BOARDING_CHARTS_INFO} from "../../../operations/queries/getOffAndOnBoardingChartsInfo";
import {GET_REQUISITION_TASKS_CHARTS_INFO} from "../../../operations/queries/getRequisitionTasksChartsInfo";
import handleError from "../../../data/handleError";
import ChartsBox from "./ChartsBox";
import {
  ONBOARDING_CHARTS_SUBTITLE,
  REQUISITION_CHARTS_SUBTITLE,
  DEFAULT_LOADING_INFO_OBJECT,
  ORGANIZATION_CHARTS_CONFIG,
  ONBOARDING_CHARTS_CONFIG,
  OFFBOARDING_CHARTS_CONFIG,
  REQUISITIONS_CHARTS_CONFIG
} from "../../../data/constants/ReportingCharts";


const ReportingPageContent = () => {
  const [loadingInfo, setLoadingInfo] = useState({...DEFAULT_LOADING_INFO_OBJECT});
  const [organizationChartsData, setOrganizationChartsData] = useState(null);
  const [onboardingChartsData, setOnboardingChartsData] = useState(null);
  const [offboardingChartsData, setOffboardingChartsData] = useState(null);
  const [requisitionStatistics, setRequisitionStatistics] = useState(null);
  const history = useHistory();

  useQuery(GET_ALL_ORGANIZATION_CHARTS_INFO, {
    onCompleted: data => {
      setOrganizationChartsData(data.get_all_organization_charts_info);
      setLoadingInfo({...loadingInfo, organization: false});
    },
    onError: error => {
      handleError(error)(history);
      setLoadingInfo({...loadingInfo, organization: false});
    }
  });

  useQuery(GET_OFF_AND_ON_BOARDING_CHARTS_INFO, {
    onCompleted: data => {
      setOnboardingChartsData(data.get_off_and_on_boarding_charts_info.onboarding);
      setOffboardingChartsData(data.get_off_and_on_boarding_charts_info.offboarding);
      setLoadingInfo({...loadingInfo, boarding: false});
    },
    onError: error => {
      handleError(error)(history);
      setLoadingInfo({...loadingInfo, boarding: false});
    }
  });

  useQuery(GET_REQUISITION_TASKS_CHARTS_INFO, {
    onCompleted: data => {
      setRequisitionStatistics(data.get_requisition_tasks_charts_info);
      setLoadingInfo({...loadingInfo, requisitions: false});
    },
    onError: error => {
      handleError(error)(history);
      setLoadingInfo({...loadingInfo, requisitions: false});
    },
  });

  return (
    <>
      <Box>
        <ChartsBox chartData={organizationChartsData}
                   boxTitle="Organization Statistics"
                   config={ORGANIZATION_CHARTS_CONFIG}
                   chartsType="PieChart"
                   isLoading={loadingInfo.organization}
                   key="organization-statistics"/>
        <ChartsBox chartData={onboardingChartsData}
                   boxTitle="Onboarding Statistics"
                   config={ONBOARDING_CHARTS_CONFIG}
                   subtitle={ONBOARDING_CHARTS_SUBTITLE}
                   chartsType="PieChart"
                   isLoading={loadingInfo.boarding}
                   key="onboarding-statistics"/>
        <ChartsBox chartData={offboardingChartsData}
                   boxTitle="Offboarding Statistics"
                   config={OFFBOARDING_CHARTS_CONFIG}
                   chartsType="PieChart"
                   isLoading={loadingInfo.boarding}
                   key="offboarding-statistics"/>
        <ChartsBox chartData={requisitionStatistics}
                   boxTitle="Requisition Statistics"
                   config={REQUISITIONS_CHARTS_CONFIG}
                   subtitle={REQUISITION_CHARTS_SUBTITLE}
                   chartsType="BarChart"
                   forRequisitions={true}
                   isLoading={loadingInfo.requisitions}
                   key="requisition-statistics"/>
      </Box>
    </>
  );
};

export default ReportingPageContent;