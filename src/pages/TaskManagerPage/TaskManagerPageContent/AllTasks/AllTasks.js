import React, {memo, useCallback, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useLazyQuery, useQuery, useSubscription} from "@apollo/client";
import {Box} from "@material-ui/core";
import CountBox from "./CountBox";
import FilterBox from "./FilterBox";
import TaskManagerTable from "../TaskManagerTable";
import {CREATE_TASK_SUBSCRIPTION} from "../../../../operations/subscription/createTaskSubscription";
import {GET_TASKS} from "../../../../operations/queries/getTasks";
import {UPDATE_TASK_SUBSCRIPTION} from "../../../../operations/subscription/updateTaskSubscription";
import {connect} from "react-redux";
import {
  addTaskData,
  setAllTasksData,
} from "../../../../data/redux/taskManager/taskManagerActions";
import BoxCardWrapper from "../../../../components/blocks/BoxCardWrapper";
import handleError from "../../../../data/handleError";
import TableToolbar from "../TableToolbar";
import {GET_ALL_TASKS_TOTALS} from "../../../../operations/queries/getAllTasksTotals";
import BulkApprovalModal from "../BulkModal/BulkApprovalModal";
import BulkApprovalButton from "../BulkApprovalButton";
import {AuthUserContext} from "../../../../AuthUserContextProvider";

const AllTasks = ({allTasksData, setAllTasksData, addTaskData}) => {
  const history = useHistory();
  const {
    permBulkApproverOnboarding,
    permBulkApproverRequisition,
    permBulkApproverOffboarding,
  } = useContext(AuthUserContext);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [filters, setFilters] = useState({
    pageCount: 0,
    itemsPerPage: 25,
    taskType: "",
    taskStatus: "",
    taskCreator: "",
    currentView: "all",
    query: "",
    dateFrom: "",
    dateTo: "",
  });

  const [tasksCountStatus, setTasksCountStatus] = useState(true);
  const [currentQuery, setCurrentQuery] = useState("");
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [isResetFilters, setIsResetFilters] = useState(false);
  const [openBulkModal, setOpenBulkModal] = useState(false);

  const createTaskSubscription = useSubscription(CREATE_TASK_SUBSCRIPTION);
  const updateTaskSubscription = useSubscription(UPDATE_TASK_SUBSCRIPTION);

  const [executeSearch] = useLazyQuery(GET_TASKS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (result) => {
      handleQueryFilter(result);
    },
    onError: (error) => handleError(error)(history),
  });

  const {data: totalData, refetch} = useQuery(GET_ALL_TASKS_TOTALS, {
    fetchPolicy: "cache-and-network",

    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    setIsSearchInProgress(true);
    executeSearch({
      variables: {filters: filters},
    });
  }, [filters, executeSearch]);

  const handleQueryFilter = (result) => {
    if (result) {
      if (filters.pageCount > 0) {
        const data = [...allTasksData, ...result.get_tasks];
        setAllTasksData(data);
      } else {
        setAllTasksData(result.get_tasks);
      }
      setIsSearchInProgress(false);
      setTasksCountStatus(result.get_tasks?.length >= filters?.itemsPerPage);
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
      setAllTasksData(null);
    }
    setAllTasksData([]);
    setIsSearchInProgress(true);
    setCurrentQuery(query);
    setIsResetFilters(true);
    setFilters({
      ...filters,
      query,
      pageCount,
    });
  };

  const handleCurrentView = (currentView) => {
    setAllTasksData([]);
    setIsSearchInProgress(true);
    setFilters({
      currentView,
      pageCount: 0,
      query: "",
      taskType: "",
      taskStatus: "",
      dateFrom: "",
      dateTo: "",
      itemsPerPage: 25,
      taskCreator: "",
    });
  };

  const handleFilterChange = (filters) => {
    setIsSearchInProgress(true);
    setAllTasksData([]);
    setFilters({
      ...filters,
      pageCount: 0,
    });
  };

  const handleFilterClick = useCallback(() => {
    setFilterOpen(!filterOpen);
  }, [setFilterOpen, filterOpen]);

  // todo check filters before unshift
  useEffect(() => {
    const subData = createTaskSubscription?.data?.createTaskSubscription;
    if (subData) {
      addTaskData(subData);
    }
  }, [createTaskSubscription.data, createTaskSubscription.error]);

  useEffect(() => {
    const subData = updateTaskSubscription?.data?.updateTaskSubscription;
    if (subData) {
      let updatedData = [];
      let isUpdatedArray = false;
      for (let i = 0; i < allTasksData.length; i++) {
        if (allTasksData[i].id === subData.id) {
          updatedData.push(subData);
          isUpdatedArray = true;
        } else {
          updatedData.push(allTasksData[i]);
        }
      }
      if (isUpdatedArray) {
        setAllTasksData(updatedData);
      }
    }
  }, [updateTaskSubscription.data, updateTaskSubscription.error]);

  const handleRefresh = () => {
    let pageCount = 0;
    let query = "";
    setCurrentQuery(query);
    setFilters({...filters, query, pageCount});
    refetch();
  };

  const hasBulkApprovePermission =
    permBulkApproverOnboarding ||
    permBulkApproverRequisition ||
    permBulkApproverOffboarding;

  const handleOpenBulkModal = useCallback(() => {
    setOpenBulkModal(true);
  }, [setOpenBulkModal]);

  const handleCloseBulkModal = useCallback(() => {
    setOpenBulkModal(false);
  }, [setOpenBulkModal]);

  return (
    <Box minWidth={1050}>
      <CountBox data={totalData?.get_all_tasks_totals} />

      <BoxCardWrapper>
        <TableToolbar
          currentView={filters.currentView}
          query={filters.query}
          handleCurrentView={handleCurrentView}
          handleSearchQuery={handleSearchQuery}
          handleFilterClick={handleFilterClick}
          isFilterApplied={isFilterApplied}
          handleRefresh={handleRefresh}
        >
          {hasBulkApprovePermission && (
            <BulkApprovalButton handleClick={handleOpenBulkModal} />
          )}
        </TableToolbar>

        <FilterBox
          filterOpen={filterOpen}
          setIsFilterApplied={setIsFilterApplied}
          filters={filters}
          onFilterChange={handleFilterChange}
          isResetFilters={isResetFilters}
        />
      </BoxCardWrapper>

      <Box>
        <TaskManagerTable
          currentPage={filters.pageCount}
          data={allTasksData}
          tasksCountStatus={tasksCountStatus}
          onPageChange={handlePageChange}
          isSearchInProgress={isSearchInProgress}
        />
      </Box>
      {openBulkModal && (
        <BulkApprovalModal
          open={openBulkModal}
          handleClose={handleCloseBulkModal}
          handleRefresh={handleRefresh}
        />
      )}
    </Box>
  );
};

export default connect(
  (state) => ({allTasksData: state.taskManager.get("allTasksData")}),
  {setAllTasksData, addTaskData}
)(memo(AllTasks));
