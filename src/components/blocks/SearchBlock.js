import React, {memo, useEffect, useState} from "react";
import {Box, Button, makeStyles, Zoom} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchTextField from "../inputs/SearchTextField";
import SelectSearchTypeField from "../inputs/SelectSearchTypeField";

const useStyles = makeStyles((theme) => ({
  searchFilterBox: {
    display: "flex",
    alignItems: "center",
  },
  filterBtn: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("xl")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(2),
    },
  },
}));

const SearchBlock = ({
  searchQuery,
  handleChange,
  searchType,
  setSearchType,
  types,
  handleFilterClick,
  isFilterApplied,
  searchProps,
  ...props
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  useEffect(() => {handleChange(query)}, [query]);

  return (
    <Box className={classes.searchFilterBox} {...props}>
      <Box style={{display: "flex"}}>
        <SearchTextField
          value={query}
          handleChange={setQuery}
          {...searchProps}
        />
        {types && (
          <SelectSearchTypeField
            id="select-user-directory-search-type"
            searchType={searchType}
            handleChange={setSearchType}
            types={types}
          />
        )}
      </Box>
      <Box flexGrow={1} />
      {handleFilterClick && (
        <Zoom in={searchQuery?.length > 0} timeout={500}>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilterClick}
              className={classes.filterBtn}
            >
              <FilterListIcon /> Filter Results {isFilterApplied && "(Applied)"}
            </Button>
          </Box>
         </Zoom>
      )}
    </Box>
  );
};

export default memo(SearchBlock);
