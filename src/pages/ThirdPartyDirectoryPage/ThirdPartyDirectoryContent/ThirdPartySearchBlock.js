import React, {memo, useCallback, useState} from "react";
import {Box, makeStyles} from "@material-ui/core";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import UserToolbarTypography from "../../../components/typographies/ToolbarTypography";
import SearchBlock from "../../../components/blocks/SearchBlock";
import ThirdPartyFilterBlock from "./ThirdPartyDirectoryFilterBlock";
import {connect} from "react-redux";
import {setSearchQuery} from "../../../data/redux/thirdParty/thirdPartyActions";
import useDebouncedChangeHandler from "../../../hooks/useDebouncedChangeHandler";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientPaper: {
    backgroundImage: theme.palette.background.gradient,
  },
}));

const ThirdPartySearchBlock = ({searchQuery, setSearchQuery}) => {
  const classes = useStyles();
  const [filterOpen, setFilterOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const handleFilterClick = useCallback(() => {
    setFilterOpen(!filterOpen);
  }, [setFilterOpen, filterOpen]);

  const debouncedChangeHandler = useDebouncedChangeHandler(setSearchQuery);

  return (
    <Box mt={3}>
      <PaperCardWrapper className={classes.gradientPaper}>
        <Box className={classes.searchBox}>
          <UserToolbarTypography white title="Third Party Search" />

          <SearchBlock
            searchQuery={searchQuery}
            handleChange={debouncedChangeHandler}
            searchProps={{
              id: "third-party-search-text-field",
              label: "Search by Third Party: Name, AltName, Vendor Type, Owner, Contact",
            }}
            handleFilterClick={handleFilterClick}
            isFilterApplied={isFilterApplied}
          />
        </Box>

        {searchQuery?.length > 0 && (
          <ThirdPartyFilterBlock
            filterOpen={filterOpen}
            setIsFilterApplied={setIsFilterApplied}
          />
        )}
      </PaperCardWrapper>
    </Box>
  );
};

export default connect(
  (state) => ({
    searchQuery: state.thirdParty.get("searchQuery"),
  }),
  {setSearchQuery}
)(memo(ThirdPartySearchBlock));
