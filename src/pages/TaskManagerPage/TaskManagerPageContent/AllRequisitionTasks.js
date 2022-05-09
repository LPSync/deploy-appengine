import React, {memo, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {useHistory} from "react-router-dom";
import {Box, Toolbar} from "@material-ui/core";
import TaskManagerTable from "./TaskManagerTable";
import handleError from "../../../data/handleError";
import {GET_ALL_REQUISITION_TASKS} from "../../../operations/queries/getAllRequisitionTasks";
import RefreshButton from "../../../components/buttons/RefreshButton";
import SearchInput from "../../../components/SearchInput";
import BoxCardWrapper from "../../../components/blocks/BoxCardWrapper";

const AllRequisitionTasks = () => {
  const history = useHistory();
  const [filters, setFilters] = useState({
    pageCount: 0,
    itemsPerPage: 25,
    query: "",
  });
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [tasksCountStatus, setTasksCountStatus] = useState(true);
  const [reqData, setReqData] = useState([]);

  const [executeSearch] = useLazyQuery(GET_ALL_REQUISITION_TASKS, {
    fetchPolicy: "cache-and-network",
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
  }, [filters]);

  const handleQueryFilter = (result) => {
    if (result) {
      if (filters.pageCount > 0) {
        const data = [...reqData, ...result.get_all_requisition_tasks];
        setReqData(data);
      } else {
        setReqData(result.get_all_requisition_tasks);
      }
      setIsSearchInProgress(false);
      setTasksCountStatus(
        result.get_all_requisition_tasks?.length >= filters?.itemsPerPage
      );
    } else {
      setTasksCountStatus(false);
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

  const handlePageChange = (pageCount) => {
    if (!isSearchInProgress) {
      setFilters({...filters, pageCount});
    }
  };

  return (
    <Box>
      <Box>
        <BoxCardWrapper>
          <Box>
            <Toolbar>
              <SearchInput
                onSearch={handleSearchQuery}
                searchQuery={filters.query}
                label={"Search All Tasks"}
                helperText={"Search by ID, Name, Type, Job Title or Status"}
              />
              <Box flexGrow={1} />

              <RefreshButton handleClick={handleRefresh} />
            </Toolbar>
          </Box>
        </BoxCardWrapper>

        <Box mt={2}>
          <TaskManagerTable
            currentPage={filters.pageCount}
            data={reqData}
            tasksCountStatus={tasksCountStatus}
            onPageChange={handlePageChange}
            isSearchInProgress={isSearchInProgress}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(AllRequisitionTasks);
