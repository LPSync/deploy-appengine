import React, { memo, useState } from "react";
import { Table, TableBody } from "@material-ui/core";
import EnhancedTableHead from "./EnhancedTableHead";
import LoadingCircle from "../circularProgress/LoadingCircle";
import { getComparator, stableSort } from "../../data/helper/helpers";

const TableContent = ({data, isLoading, headCells, headAlign, tableRow, initOrderBy,
  sliceFrom, sliceTo }) => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState(initOrderBy);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Table stickyHeader size="small">
      <EnhancedTableHead
        headAlign={headAlign}
        headCells={headCells}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />
      {isLoading ? (<LoadingCircle />) : (
        <TableBody>
          {stableSort(data, getComparator(order, orderBy))?.slice(sliceFrom, sliceTo)?.map(tableRow)}
        </TableBody>
      )}
    </Table>
  );
};

export default memo(TableContent);