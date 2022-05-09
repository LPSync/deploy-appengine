import React, {memo} from "react";
import {Box, Button, Toolbar} from "@material-ui/core";
import CurrentView from "./AllTasks/CurrentView";
import Search from "./AllTasks/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshButton from "../../../components/buttons/RefreshButton";

const TableToolbar = ({
  currentView,
  query,
  handleCurrentView,
  handleSearchQuery,
  handleFilterClick,
  isFilterApplied,
  handleRefresh,
  children,
}) => {
  return (
    <Box>
      <Toolbar>
        <CurrentView
          currentView={currentView}
          onCurrentViewChange={handleCurrentView}
        />
        <Box flexGrow={1} />
        <Search
          searchQuery={query}
          onSearch={handleSearchQuery}
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleFilterClick}
        >
          <FilterListIcon /> Filter All Tasks{" "}
          {isFilterApplied && "(Applied)"}
        </Button>

        {children && <Box ml={2}> {children} </Box>}

        <Box ml={2}>
          <RefreshButton handleClick={handleRefresh} />
        </Box>
      </Toolbar>
    </Box>
  );
};

export default memo(TableToolbar);