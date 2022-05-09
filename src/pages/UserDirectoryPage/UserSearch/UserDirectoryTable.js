import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Box, makeStyles, TableContainer } from "@material-ui/core";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import UserToolbarTypography from "../../../components/typographies/ToolbarTypography";
import NoResultsTypography from "../../../components/typographies/NoResultsTypography";
import { useSelector } from "react-redux";
import CustomInfiniteScroll from "../../../components/table/CustomInfiniteScroll";
import UserTableContent from "./UserTableContent";

const useStyles = makeStyles((theme) => ({
  userDirectoryTableContainer: {
    maxHeight: "calc(65vh - 140px)",
    height: "100%",
    minHeight: 300,
    overflow: "auto",
  },
  tableBox: { padding: theme.spacing(2) },
  title: {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
}));

const itemsOnPage = 15;

const UserDirectoryTable = ({ loading }) => {
  const classes = useStyles();
  const usersData = useSelector(state => state?.userDirectory.get("usersData"));
  const [visibleUsers, setVisibleUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
  }, [usersData]);

  useEffect(() => {
    if(usersData) {
      setVisibleUsers(usersData?.slice(0, itemsOnPage * currentPage));
      setHasMore(usersData?.length > itemsOnPage * currentPage);
    }
  }, [currentPage, usersData]);

  const dataLength = useMemo(() => visibleUsers?.length,
    [visibleUsers]);

  const handlePageChange = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  return (
    <Box minWidth={1050} >
      <PaperCardWrapper>
        <UserToolbarTypography title="Search Results" />

        <Box className={classes.tableBox}>
          {loading ? (
            <LoadingCircle text={"searching..."} />
          ) : visibleUsers?.length ? (
            <TableContainer id={"user-directory"} className={classes.userDirectoryTableContainer} >
              <CustomInfiniteScroll
                scrollableTarget="user-directory"
                dataLength={dataLength}
                next={handlePageChange}
                hasMore={hasMore}
              >
                <UserTableContent users={visibleUsers} />

              </CustomInfiniteScroll>

            </TableContainer>
          ) : (
            <NoResultsTypography />
          )}
        </Box>
      </PaperCardWrapper>
    </Box>
  );
};

export default memo(UserDirectoryTable);
