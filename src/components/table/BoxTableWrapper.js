import React, {memo} from "react";
import {Box, makeStyles, TableContainer} from "@material-ui/core";
import NoResultsTypography from "../typographies/NoResultsTypography";
import CustomInfiniteScroll from "./CustomInfiniteScroll";
import TableCircularProgress from "../circularProgress/TableCircularProgress";

const useStyles = makeStyles(() => ({
  tableContainer: {
    height: "calc(95vh - 1000px)",
    minHeight: ({minHeight}) => (minHeight ? minHeight : "425px"),
  },
}));

const BoxTableWrapper = ({
  id,
  dataLength,
  loading,
  hasMore,
  next,
  className,
  children,
  minHeight,
}) => {
  const classes = useStyles({minHeight});

  return (
    <Box style={{position: "relative", minHeight: "50px"}}>
      {!dataLength && loading ? (
        <TableCircularProgress />
      ) : !dataLength ? (
        <NoResultsTypography />
      ) : (
        <TableContainer id={id} className={className || classes.tableContainer}>
          <CustomInfiniteScroll
            scrollableTarget={id}
            dataLength={dataLength}
            next={next}
            hasMore={hasMore}
          >
            {children}
          </CustomInfiniteScroll>
        </TableContainer>
      )}
    </Box>
  );
};

export default memo(BoxTableWrapper);
