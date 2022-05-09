import React, {memo, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {Box} from "@material-ui/core";
import handleError from "../../data/handleError";
import ViewTaskButton from "../../components/buttons/ViewButton";
import SearchInput from "../../components/SearchInput";
import {GET_AUTH_ONBOARDING_TASKS} from "../../operations/queries/getAuthOnboardingTasks";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import {connect} from "react-redux";
import {
  setIsCandidateSubmitted,
  setViewTaskTypeDetails,
} from "../../data/redux/onboardingDashboard/onboardingDashboardActions";
import RequestSearchBar from "./RequestSearchBar";
import BoxTableWrapper from "../../components/table/BoxTableWrapper";
import DashboardTableContent from "./DashboardTableContent";
import DateRowField from "../../components/taskRowFields/DateRowField";
import CandidateStatusRowField from "../../components/taskRowFields/CandidateStatusRowField";
import {getOnboardingFullName} from "../../data/helper/helpers";
import InfoBlock from "../../components/InfoBlock";

const headCells = [
  {id: "id", label: "ID"},
  {id: "taskCreatedDateTime", label: "Requested Date"},
  {id: "taskCreatorUsername", label: "Requested By"},
  {id: "onboardingTask.onboardFirstName", label: "Candidate Name"},
  {id: "onboardingTask.onboardEmployeeType", label: "Emp Type"},
  {id: "onboardingTask.onboardJobTitle", label: "Job Title"},
  {id: "taskScheduleDateTime", label: "Start Date"},
  {id: "taskStatus", label: "Status"},
  {id: "view", label: "View Task", isNotSortable: true},
];

export const candidateValueRow = (task) => [
  {id: "id", value: task?.id},
  {
    id: "taskCreatedDateTime",
    value: <DateRowField dateTime={task?.taskCreatedDateTime} />,
  },
  {
    id: "taskCreatorUsername",
    value: `${task?.taskCreatorFirstName || ""} ${task?.taskCreatorLastName || ""}`
  },
  {id: "onboardingTask.onboardFirstName", value: getOnboardingFullName(task)},
  {
    id: "onboardingTask.onboardEmployeeType",
    value: task?.onboardingTask?.onboardEmployeeType,
  },
  {
    id: "onboardingTask.onboardJobTitle",
    value: task?.onboardingTask?.onboardJobTitle,
  },
  {
    id: "taskScheduleDateTime",
    value: <DateRowField date={task?.taskScheduleDateTime} />,
  },
  {id: "taskStatus", value: <CandidateStatusRowField candidate={task} />},
  {id: "view", value: <ViewTaskButton />},
];

const CandidateRequests = ({
  setViewTaskTypeDetails,
  isCandidateSubmitted,
  setIsCandidateSubmitted,
  handleOnSelectedTask,
}) => {
  const history = useHistory();
  const [filters, setFilters] = useState({
    pageCount: 0,
    itemsPerPage: 25,
    query: "",
  });

  const [candidateData, setCandidateData] = useState([]);
  const [tasksCountStatus, setTasksCountStatus] = useState(true);
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");

  const [executeSearch] = useLazyQuery(GET_AUTH_ONBOARDING_TASKS, {
    fetchPolicy: "no-cache",
    onCompleted: (result) => {
      handleQueryFilter(result);
      setIsSearchInProgress(false);
    },
    onError: (error) => handleError(error)(history),
  });

  const executeQuery = () => {
    setIsSearchInProgress(true);
    executeSearch({
      variables: {filters: filters},
    });
  };

  useEffect(() => {
    executeQuery();

    if (isCandidateSubmitted) {
      executeQuery();
      setIsCandidateSubmitted(false);
    }
  }, [filters, isCandidateSubmitted]);

  const handleQueryFilter = (result) => {
    if (result) {
      if (filters.pageCount > 0) {
        const data = [...candidateData, ...result.get_auth_onboarding_tasks];
        setCandidateData(data);
      } else {
        setCandidateData(result.get_auth_onboarding_tasks);
      }
      setIsSearchInProgress(false);
      setTasksCountStatus(
        result.get_auth_onboarding_tasks?.length >= filters?.itemsPerPage
      );
    } else {
      setTasksCountStatus(false);
    }
  };

  const handlePageChange = (pageCount) => {
    if (!isSearchInProgress) {
      setFilters({...filters, pageCount});
    }
  };

  const handleSearchQuery = (query) => {
    let pageCount = filters.pageCount;
    if (filters.query && query !== currentQuery) {
      pageCount = 0;
    }
    setCurrentQuery(query);
    setIsSearchInProgress(true);
    setFilters({
      ...filters,
      query,
      pageCount,
    });
  };

  const handleRefresh = async () => {
    let pageCount = 0;
    let query = "";
    setCurrentQuery(query);
    await setFilters({...filters, query, pageCount});
  };

  return (
    <Box>
      <InfoBlock>
        These are candidate requests that have been made where you are the
        hiring manager or requester. Also, if you have delegate permissions to
        manage someone else's candidates you will see them here too.
      </InfoBlock>
      <RequestSearchBar
        to={FrontendRoutes.CANDIDATE_REQUEST}
        btnText="new candidate request"
        handleRefresh={handleRefresh}
      >
        <SearchInput
          onSearch={handleSearchQuery}
          searchQuery={filters.query}
          label={"Search All Candidate Tasks"}
          helperText={"Search by ID, Name, Type, Job Title, or Status"}
        />
      </RequestSearchBar>

      <BoxTableWrapper
        id={"candidate-table"}
        loading={isSearchInProgress}
        dataLength={candidateData?.length}
        hasMore={tasksCountStatus}
        next={() => handlePageChange && handlePageChange(filters.pageCount + 1)}
      >
        <DashboardTableContent
          data={candidateData}
          headCells={headCells}
          valRow={candidateValueRow}
          handleOnSelectedTask={handleOnSelectedTask}
          setViewTaskTypeDetails={setViewTaskTypeDetails}
        />
      </BoxTableWrapper>
    </Box>
  );
};

export default connect(
  (state) => ({
    isCandidateSubmitted: state.onboardingDashboard.get("isCandidateSubmitted"),
  }),
  {setViewTaskTypeDetails, setIsCandidateSubmitted}
)(memo(CandidateRequests));
