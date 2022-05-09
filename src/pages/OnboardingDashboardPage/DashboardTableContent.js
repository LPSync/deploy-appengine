import {Table, TableBody} from "@material-ui/core";
import React, {memo, useState} from "react";
import EnhancedTableHead from "../../components/table/EnhancedTableHead";
import LoadingCircle from "../../components/circularProgress/LoadingCircle";
import {getComparator, stableSort} from "../../data/helper/helpers";
import CustomTableRow from "../../components/table/CustomTableRow";

const DashboardTableContent = ({valRow, headCells, data, isLoading, handleOnSelectedTask, setViewTaskTypeDetails}) => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("taskCreatedDateTime");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Table stickyHeader size="small">
      <EnhancedTableHead
        headAlign={"left"}
        headCells={headCells}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />
      {isLoading ? (<LoadingCircle/>) : (
        <TableBody>
          {stableSort(data, getComparator(order, orderBy)).map((task) => (
            <CustomTableRow
              key={task.id}
              id={task.id}
              rowData={valRow(task)}
              align="left"
              handleClick={() => {
                setViewTaskTypeDetails(task.taskType);
                handleOnSelectedTask(task.id);
              }}
            />
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export default memo(DashboardTableContent);
