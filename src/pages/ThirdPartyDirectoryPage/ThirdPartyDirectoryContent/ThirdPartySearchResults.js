import React, {memo, useCallback, useEffect, useState} from "react";
import {GET_THIRD_PARTIES} from "../../../operations/queries/getThirdParties";
import {useLazyQuery} from "@apollo/client";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {setAllThirdParties, setFilters} from "../../../data/redux/thirdParty/thirdPartyActions";
import {Box, makeStyles, TableContainer, Typography} from "@material-ui/core";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import CustomInfiniteScroll from "../../../components/table/CustomInfiniteScroll";
import ThirdPartyDirectoryTableContent from "./ThirdPartyDirectoryTableContent";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import {removeExtraSpaces} from "../../../data/helper/commonFunctions";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: "50vh"
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.15rem"
  },
  noDataTypography: {
    paddingLeft: theme.spacing(5)
  }
}));

const ThirdPartySearchResults = ({
  allThirdParties,
  setAllThirdParties,
  filters,
  trimmedSearchQuery,
  setFilters,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [tasksCountStatus, setTasksCountStatus] = useState(true);

  const [executeSearch] = useLazyQuery(GET_THIRD_PARTIES, {
    // notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      handleQueryFilter(data);
    },
    onError: (error) => handleError(error)(history)
  });

  const handleQueryFilter = (result) => {
    if (result) {
      if (filters.pageCount > 0) {
        const data = [...allThirdParties, ...result.get_third_parties];
        setAllThirdParties(data);
      } else {
        setAllThirdParties(result.get_third_parties);
      }
      setIsSearchInProgress(false);
      setTasksCountStatus(result.get_third_parties?.length >= filters?.itemsPerPage);
    } else {
      setTasksCountStatus(false);
    }
  };

  useEffect(() => {
    if (trimmedSearchQuery?.length && executeSearch && filters) {
      setIsSearchInProgress(true);
      executeSearch({
        variables: {filters: {...filters, query: trimmedSearchQuery}}
      });
    }
  }, [trimmedSearchQuery, filters, executeSearch]);

  const handlePageChange = useCallback(() => {
    if (!isSearchInProgress) {
      setFilters({...filters, pageCount: filters.pageCount + 1});
    }
  }, [isSearchInProgress, filters, setFilters]);
  return (
    <Box mt={2} minWidth={1050}>
      <PaperCardWrapper>
        {isSearchInProgress && !allThirdParties?.length ? <LoadingCircle text="Loading thirdParties..." /> :
          !allThirdParties?.length ? <Typography className={classes.noDataTypography}>No Third Parties</Typography>
            : (
              <Box p={2}>
                <TableContainer
                  className={classes.tableContainer}
                  id={"task-manager"}
                >
                  <CustomInfiniteScroll
                    scrollableTarget="task-manager"
                    dataLength={allThirdParties.length}
                    next={handlePageChange}
                    hasMore={tasksCountStatus}
                  >
                    <ThirdPartyDirectoryTableContent thirdParties={allThirdParties} />
                  </CustomInfiniteScroll>
                </TableContainer>
              </Box>
            )}
      </PaperCardWrapper>
    </Box>
  );
};

export default connect(state => ({
  trimmedSearchQuery: removeExtraSpaces(state.thirdParty.get("searchQuery")),
  allThirdParties: state.thirdParty.get("allThirdParties"),
  filters: state.thirdParty.get("filters")
}), {setAllThirdParties, setFilters})
(memo(ThirdPartySearchResults));