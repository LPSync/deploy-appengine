import React, {memo, useState} from "react";
import {makeStyles, TableContainer, TablePagination, Typography} from "@material-ui/core";
import {getShortDateWithTimeString} from "../../../data/helper/DateTimezoneHelpers";
import TableContent from "../../../components/table/TableContent";
import CustomTableRow from "../../../components/table/CustomTableRow";
import SystemLogsDescription from "./SystemLogsDescription";

const useStyles = makeStyles(() => ({
  tableContainer: {
    height: "calc(95vh - 350px)",
    minHeight: "500px",
  },
}));

const headCells = [
  {
    id: "dateTime",
    label: "Date & Time",
  },
  {
    id: "userId",
    label: "Username",
  },
  {
    id: "logType",
    label: "Type",
  },
  {
    id: "logNotification",
    label: "Notification",
  },
  {
    id: "logDescription",
    label: "Description",
  },
];

const getSystemLogRowData = (log) => [
  {
    id: "dateTime",
    value: <Typography component={"div"} variant={"subtitle2"}>
      {getShortDateWithTimeString(log.logDateTime)}
    </Typography>,
  },
  {id: "userId", value: log.userId},
  {id: "logType", value: log.logType},
  {id: "logNotification", value: log.logNotification},
  {
    id: "logDescription",
    value: <SystemLogsDescription logDescription={log.logDescription}/>
  },
];

const SystemLogsRow = (log) => {
  return (
    <CustomTableRow
      key={log?.id}
      id={log?.id}
      rowData={getSystemLogRowData(log)}
    />
  );
};

const SystemsLogsTable = ({logsData}) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <TableContent
          data={logsData}
          headCells={headCells}
          sliceFrom={page * rowsPerPage}
          sliceTo={page * rowsPerPage + rowsPerPage}
          initOrderBy={"logDateTime"}
          tableRow={SystemLogsRow}
        />
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={logsData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default memo(SystemsLogsTable);