import React, {useState, useEffect, memo} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {useLazyQuery, useQuery} from "@apollo/client";
import {Box, makeStyles} from "@material-ui/core";
import RequisitionTotals from "./TotalContainers/RequisitionTotals";
import CandidateTotals from "./TotalContainers/CandidateTotals";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import RequisitionRequests from "./RequisitionRequests";
import CandidateRequests from "./CandidateRequests";
import {GET_TASK} from "../../operations/queries/getTask";
import handleError from "../../data/handleError";
import RequestInfoBox from "./RequestInfoBox";
import DelegatesInfoBox from "./DelegatesInfoBox";
import {GET_AUTH_ONBOARDING_DELEGATES} from "../../operations/queries/getAuthOnboardingDelegates";
import SelectedTaskDrawer from "./SelectedTaskDrawer";
import {useDispatch} from "react-redux";
import {
  setIsDrawerOpen,
  setSelectedTaskData,
} from "../../data/redux/onboardingDashboard/onboardingDashboardActions";
import TabsPaper from "../../components/tabs/TabsPaper";
import AlertBox from "../../components/AlertBox";

const useStyles = makeStyles(() => ({
  totalBox: {
    display: "flex",
  },
  infoBoxWrapper: {
    display: "flex",
  },
}));

const tabName = "scrollable-auto";

const OnboardingDashboardPageContent = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  let match = useRouteMatch(FrontendRoutes.ONBOARDING_DASHBOARD_VIEW());

  const [value, setValue] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const dashView = match ? match.params.hash : null;

    if (dashView) {
      if (dashView === "requisition-requests") {
        setValue(0);
      } else if (dashView === "candidate-requests") {
        setValue(1);
      }
    }
  }, [match]);

  const {data} = useQuery(GET_AUTH_ONBOARDING_DELEGATES, {
    onError: (error) => handleError(error)(history),
  });

  const [executeSearch] = useLazyQuery(GET_TASK, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      dispatch(setSelectedTaskData(data.get_task));
      dispatch(setIsDrawerOpen(true));
    },
    onError: (error) => handleError(error)(history),
  });

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
    let dashView;
    if (newValue === 0) {
      dashView = "requisition-requests";
    } else if (newValue === 1) {
      dashView = "candidate-requests";
    }
    history.push(FrontendRoutes.ONBOARDING_DASHBOARD_VIEW(dashView));
  };

  const handleOnSelectedTask = (taskId) => {
    executeSearch({variables: {search: taskId}});
    dispatch(setIsDrawerOpen(true));
  };

  const onboardingDashboardTabs = [
    {
      label: "Requisition Requests",
      content: (
        <RequisitionRequests handleOnSelectedTask={handleOnSelectedTask} />
      ),
    },
    {
      label: "Candidate Requests",
      content: (
        <CandidateRequests handleOnSelectedTask={handleOnSelectedTask} />
      ),
    },
  ];

  return (
    <div>
      <Box>
        {isSubmitted && (
          <AlertBox message={"Task Updated"} severity="success" my={1} />
        )}
      </Box>

      <Box mb={2} className={classes.totalBox}>
        <Box mr={2} className={classes.infoBoxWrapper}>
          <RequestInfoBox />
        </Box>
        <Box mr={2}>
          <RequisitionTotals />
        </Box>
        <Box>
          <CandidateTotals />
        </Box>
      </Box>
      {data?.get_auth_onboarding_delegates?.onboardingDelegates?.length > 0 && (
        <DelegatesInfoBox
          delegateData={
            data?.get_auth_onboarding_delegates?.onboardingDelegates
          }
        />
      )}

      <Box mt={3} minWidth={1050}>
        <Box minWidth={1050}>
          <TabsPaper
            value={value}
            handleChange={handleTabsChange}
            tabs={onboardingDashboardTabs}
            tabName={tabName}
            aria-label="onboarding dashboard tabs navigation"
            styled
          />
        </Box>
      </Box>

      <SelectedTaskDrawer setIsSubmitted={setIsSubmitted} />
    </div>
  );
};

export default memo(OnboardingDashboardPageContent);
