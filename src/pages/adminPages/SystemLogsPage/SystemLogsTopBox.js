import React, {memo} from "react";
import {Box, Button, Toolbar} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshButton from "../../../components/buttons/RefreshButton";

const SystemLogsTopBox = ({refetch, handleFilterClick, isFilterApplied}) => {
  return (
    <Box>
      <Toolbar>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleFilterClick}
        >
          <FilterListIcon /> Filter Log Entries
          {isFilterApplied && "(Applied)"}
        </Button>
        <Box flexGrow={1} />
        <RefreshButton handleClick={() => refetch()} />
      </Toolbar>
    </Box>
  )
}

export default memo(SystemLogsTopBox);