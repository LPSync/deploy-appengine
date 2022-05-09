import React, { memo, useMemo } from "react";
import {Box, CircularProgress, makeStyles, TableContainer} from "@material-ui/core";
import NoResultsTypography from "../../../components/typographies/NoResultsTypography";
import CustomInfiniteScroll from "../../../components/table/CustomInfiniteScroll";
import TaskManagerTableContent from "./TaskManagerTableContent";

const useStyles = makeStyles(() => ({
  tableContainer: {
    maxHeight: "calc(95vh - 278px)",
    height: "100%",
    minHeight: 300
  },
  taskManagerCircularProgressBlock: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(22 23 63)",
    zIndex: "999"
  }
}));

const TaskManagerTable = ({data, tasksCountStatus, onPageChange, isSearchInProgress, currentPage}) => {
  const classes = useStyles();
  const dataLength = useMemo(() =>
      data?.length,
    [data]);

  return (
    <Box style={{position: "relative"}}>
      {!dataLength && isSearchInProgress ? (
          <div className={classes.taskManagerCircularProgressBlock}>
            <CircularProgress color="secondary" />
          </div>
        ) :
        !dataLength ? (
          <NoResultsTypography />
        ) : (
          <TableContainer
            className={classes.tableContainer}
            id={"task-manager"}
          >
            <CustomInfiniteScroll
              scrollableTarget="task-manager"
              dataLength={dataLength}
              next={() => onPageChange && onPageChange(currentPage + 1)}
              hasMore={tasksCountStatus}
            >
              <TaskManagerTableContent data={data} />
            </CustomInfiniteScroll>
          </TableContainer>
        )
      }
    </Box>
  );
};

export default memo(TaskManagerTable);
