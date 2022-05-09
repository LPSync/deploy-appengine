import React, {memo, useCallback, useEffect, useState} from "react";
import {Box, makeStyles, TableContainer, Typography} from "@material-ui/core";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import ToolbarTypography from "../../../components/typographies/ToolbarTypography";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import ThirdPartyDirectoryTableContent from "./ThirdPartyDirectoryTableContent";
import CustomInfiniteScroll from "../../../components/table/CustomInfiniteScroll";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: "33vh",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.15rem"
  },
  noDataTypography: {
    paddingLeft: theme.spacing(5)
  }
}));

const ThirdPartyDirectoryTable = ({title, executeFunc}) => {
  const classes = useStyles();
  const history = useHistory();

  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [thirdPartiesCountStatus, setThirdPartiesCountStatus]= useState(false);
  const [infoThirdParties, setInfoThirdParties] = useState([]);
  const [filters, setFilters] = useState({itemsPerPage: 20, pageCount: 0});

  const handleQueryFilter = useCallback((result) => {
    if (result) {
      if (filters.pageCount > 0) {
        const data = [...infoThirdParties, ...result];
        setInfoThirdParties(data);
      } else {
        setInfoThirdParties(result);
      }
      setIsSearchInProgress(false);
      setThirdPartiesCountStatus(result?.length >= filters?.itemsPerPage);
    } else {
      setThirdPartiesCountStatus(false);
    }
  }, [filters, infoThirdParties, setInfoThirdParties, setIsSearchInProgress, setThirdPartiesCountStatus]);

  const [executeSearch] = executeFunc({
    notifyOnNetworkStatusChange: true,
    onError: (error) => handleError(error)(history)
  }, handleQueryFilter);

  const handlePageChange = useCallback(() => {
    if (!isSearchInProgress) {
      setFilters({...filters, pageCount: filters.pageCount + 1});
    }
  }, [isSearchInProgress, filters, setFilters]);

  useEffect(() => {
    if (executeSearch && filters) {
      setIsSearchInProgress(true);
      executeSearch({
        variables: {filters}
      });
    }
  }, [executeSearch, filters]);

  return (
    <Box mt={2} minWidth={1050} className={classes.outerBox}>
      <PaperCardWrapper>
        {title && <ToolbarTypography title={title} />}
        {isSearchInProgress && !infoThirdParties?.length ? <LoadingCircle text="Loading thirdParties..." /> :
          !infoThirdParties?.length ? <Typography className={classes.noDataTypography}>No Third Parties</Typography>
            : (
              <Box p={2}>
                <TableContainer
                  className={classes.tableContainer}
                  id={"third-party-directory"}
                >
                  <CustomInfiniteScroll
                    scrollableTarget="third-party-directory"
                    dataLength={infoThirdParties?.length}
                    next={handlePageChange}
                    hasMore={thirdPartiesCountStatus}
                  >
                    <ThirdPartyDirectoryTableContent thirdParties={infoThirdParties} />
                  </CustomInfiniteScroll>
                </TableContainer>
              </Box>
            )}
      </PaperCardWrapper>
    </Box>
  );
};

export default memo(ThirdPartyDirectoryTable);