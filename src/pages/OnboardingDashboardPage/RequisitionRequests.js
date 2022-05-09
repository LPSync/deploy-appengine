import React, {memo, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {Box} from "@material-ui/core";
import {GET_AUTH_REQUISITION_TASKS} from "../../operations/queries/getAuthRequisitionTasks";
import handleError from "../../data/handleError";
import SearchInput from "../../components/SearchInput";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import {connect} from "react-redux";
import {
  setIsReqSubmitted,
  setViewTaskTypeDetails,
} from "../../data/redux/onboardingDashboard/onboardingDashboardActions";
import RequestSearchBar from "./RequestSearchBar";
import BoxTableWrapper from "../../components/table/BoxTableWrapper";
import DashboardTableContent from "./DashboardTableContent";
import DateRowField from "../../components/taskRowFields/DateRowField";
import ReqJobTitleCodeField from "../../components/taskRowFields/ReqJobTitleCodeField";
import ReqStatusRowField from "../../components/taskRowFields/ReqStatusRowField";
import ViewTaskButton from "../../components/taskRowFields/ViewTaskButton";
import InfoBlock from "../../components/InfoBlock";

const headCells = [
  {id: "id", label: "ID"},
  {id: "taskCreatedDateTime", label: "Requested Date"},
  {id: "taskCreatorUsername", label: "Requested By"},
  {id: "requisitionTask.reqType", label: "Requisition Type"},
  {id: "requisitionTask.reqJobTitle", label: "Job Title"},
  {id: "requisitionTask.reqStartDate", label: "Planned Start Date"},
  {id: "taskStatus", label: "Status"},
  {id: "view", label: "View Task", isNotSortable: true},
];

export const reqValueRow = (task) => [
  {id: "id", value: task?.id},
  {
    id: "taskCreatedDateTime",
    value: <DateRowField dateTime={task?.taskCreatedDateTime} />,
  },
  {
    id: "taskCreatorUsername",
    value: `${task?.taskCreatorFirstName || ""} ${task?.taskCreatorLastName || ""}`
  },
  {id: "requisitionTask.reqType", value: task.requisitionTask.reqType},
  {
    id: "requisitionTask.reqJobTitle",
    value: <ReqJobTitleCodeField req={task} />,
  },
  {
    id: "requisitionTask.reqStartDate",
    value: <DateRowField date={task?.requisitionTask?.reqStartDate} />,
  },
  {id: "taskStatus", value: <ReqStatusRowField req={task} />},
  {id: "view", value: <ViewTaskButton />},
];

const RequisitionRequests = ({
  setViewTaskTypeDetails,
  isReqSubmitted,
  setIsReqSubmitted,
  handleOnSelectedTask,
}) => {
  const history = useHistory();

  const [filters, setFilters] = useState({
    pageCount: 0,
    itemsPerPage: 25,
    query: "",
  });

  const [reqData, setReqData] = useState([]);
  const [tasksCountStatus, setTasksCountStatus] = useState(true);
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");

  const [executeSearch] = useLazyQuery(GET_AUTH_REQUISITION_TASKS, {
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

    if (isReqSubmitted) {
      executeQuery();
      setIsReqSubmitted(false);
    }
  }, [filters, isReqSubmitted]);

  const handleQueryFilter = (result) => {
    if (result) {
      if (filters.pageCount > 0) {
        const data = [...reqData, ...result.get_auth_requisition_tasks];
        setReqData(data);
      } else {
        setReqData(result.get_auth_requisition_tasks);
      }
      setIsSearchInProgress(false);
      setTasksCountStatus(
        result.get_auth_requisition_tasks?.length >= filters?.itemsPerPage
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
        These are requisition requests that have been made where you are the
        hiring manager or requester. Also, if you have delegate permissions to
        manage someone else's requisitions you will see them here too.
      </InfoBlock>
      <RequestSearchBar
        to={FrontendRoutes.REQUISITION_REQUEST}
        btnText="new requisition request"
        handleRefresh={handleRefresh}
      >
        <SearchInput
          onSearch={handleSearchQuery}
          searchQuery={filters.query}
          label={"Search All Requisition Tasks"}
          helperText={"Search by ID, Name, Type, Job Title, or Status"}
        />
      </RequestSearchBar>

      <BoxTableWrapper
        id={"requisition-table"}
        loading={isSearchInProgress}
        dataLength={reqData?.length}
        hasMore={tasksCountStatus}
        next={() => handlePageChange && handlePageChange(filters.pageCount + 1)}
      >
        <DashboardTableContent
          data={reqData}
          headCells={headCells}
          valRow={reqValueRow}
          handleOnSelectedTask={handleOnSelectedTask}
          setViewTaskTypeDetails={setViewTaskTypeDetails}
        />
      </BoxTableWrapper>
    </Box>
  );
};

export default connect(
  (state) => ({
    isReqSubmitted: state.onboardingDashboard.get("isReqSubmitted"),
  }),
  {setViewTaskTypeDetails, setIsReqSubmitted}
)(memo(RequisitionRequests));
