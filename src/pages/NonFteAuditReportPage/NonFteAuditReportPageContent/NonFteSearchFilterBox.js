import React, {useContext, useState} from "react";
import Fuse from "fuse.js";
import {
  Box,
  Button,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import GetAppIcon from "@material-ui/icons/GetApp";
import {CSVLink} from "react-csv";
import {NonFteAuditReportContext} from "../NonFteAuditReportContextProvider";
import RefreshButton from "../../../components/buttons/RefreshButton";
import BoxCardWrapper from "../../../components/blocks/BoxCardWrapper";
import SearchTextField from "../../../components/inputs/SearchTextField";
import NonFteFilterBox from "./NonFteFilterBox";

const useStyles = makeStyles((theme) => ({
  wrapperCardContent: {
    padding: theme.spacing(3),
    backgroundImage: theme.palette.background.gradient,
  },
  searchTextField: {
    width: "40ch",
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    "& .MuiFilledInput-root": {
      background: theme.palette.primary.main,
    },
  },
}));

const NonFteSearchFilterBox = ({refetch}) => {
  const classes = useStyles();
  const {nonFteData, setAuditData} = useContext(NonFteAuditReportContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearch = (value) => {
    setSearchQuery(value);
    fuzzySearch(value);
  };

  const options = {
    shouldSort: true,
    useExtendedSearch: true,
    threshold: 0.1,
    keys: ["firstName", "lastName", "jobTitle", "managerEmail"],
  };

  const fuzzySearch = (value) => {
    if (value === "") setAuditData(nonFteData);
    else {
      const fuse = new Fuse(nonFteData, options);
      if (nonFteData) {
        const result = fuse.search(value).map((data) => data.item);

        setAuditData(result);
      }
    }
  };

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <BoxCardWrapper className={classes.wrapperCardContent}>
      <Box>
        <Toolbar>
          <SearchTextField
            label="Search All Non-Fte Reports"
            value={searchQuery}
            handleChange={handleSearch}
            className={classes.searchTextField}
          />
          <Box flexGrow={1} />
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilterClick}
            >
              <FilterListIcon /> Filter All Non-Fte Audit Reports{" "}
              {isFilterApplied && "(Applied)"}
            </Button>
          </>
          <Box ml={2}>
            <CSVLink data={nonFteData}>
              <Button variant="contained">
                <GetAppIcon className={classes.csvIcon} /> CSV Export
              </Button>
            </CSVLink>
          </Box>
          <Box ml={2}>
            <RefreshButton handleClick={() => refetch()} />{" "}
          </Box>
        </Toolbar>
      </Box>

      <NonFteFilterBox
        filterOpen={filterOpen}
        nonFteData={nonFteData}
        setIsFilterApplied={setIsFilterApplied}
        setAuditData={setAuditData}
      />
    </BoxCardWrapper>
  );
};

export default NonFteSearchFilterBox;
