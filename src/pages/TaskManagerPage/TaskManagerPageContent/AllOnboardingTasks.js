import React, {memo, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {useHistory} from "react-router-dom";
import {Box, Toolbar} from "@material-ui/core";
import TaskManagerTable from "./TaskManagerTable";
import handleError from "../../../data/handleError";
import RefreshButton from "../../../components/buttons/RefreshButton";
import SearchInput from "../../../components/SearchInput";
import {GET_ALL_ONBOARDING_TASKS} from "../../../operations/queries/getAllOnboardingTasks";
import BoxCardWrapper from "../../../components/blocks/BoxCardWrapper";

const AllOffboardingTasks = () => {
  const history = useHistory();
  const [filters, setFilters] = useState({
    pageCount: 0,
    itemsPerPage: 25,
    query: "",
  });
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [tasksCountStatus, setTasksCountStatus] = useState(true);
  const [onData, setOnData] = useState([]);

  const [executeSearch] = useLazyQuery(GET_ALL_ONBOARDING_TASKS, {
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
      console.log(result);
      if (filters.pageCount > 0) {
        const data = [...onData, ...result.get_all_onboarding_tasks];
        setOnData(data);
      } else {
        setOnData(result.get_all_onboarding_tasks);
      }
      setIsSearchInProgress(false);
      setTasksCountStatus(
        result.get_all_onboarding_tasks?.length >= filters?.itemsPerPage
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
      <BoxCardWrapper>
        <Box>
          <Toolbar>
            <SearchInput
              onSearch={handleSearchQuery}
              searchQuery={filters.query}
              label={"Search All Tasks"}
              helperText={
                "Search by ID, Name, Job Title, Employee Type, or Status"
              }
            />
            <Box flexGrow={1} />

            <RefreshButton handleClick={handleRefresh} />
          </Toolbar>
        </Box>
      </BoxCardWrapper>

      <Box mt={2}>
        <TaskManagerTable
          currentPage={filters.pageCount}
          data={onData}
          tasksCountStatus={tasksCountStatus}
          onPageChange={handlePageChange}
          isSearchInProgress={isSearchInProgress}
        />
      </Box>
    </Box>
  );
};

export default memo(AllOffboardingTasks);
