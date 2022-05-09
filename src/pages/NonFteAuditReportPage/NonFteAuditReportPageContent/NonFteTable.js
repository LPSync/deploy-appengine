import React, {memo, useContext, useState} from "react";
import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
} from "@material-ui/core";
import {NonFteAuditReportContext} from "../NonFteAuditReportContextProvider";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import StyledTableRow from "../../../components/table/StyledTableRow";
import EnhancedTableHead from "../../../components/table/EnhancedTableHead";
import {getComparator, stableSort} from "../../../data/helper/helpers";
import NoResultsTypography from "../../../components/typographies/NoResultsTypography";

const useStyles = makeStyles(() => ({
  tableContainer: {
    height: "30rem",
  },
  tableHeadCell: {
    background: "#16173f",
    fontWeight: 600,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const headCells = [
  {id: "firstName", numeric: true, disablePadding: true, label: "Name"},
  {
    id: "employeeType",
    numeric: false,
    disablePadding: false,
    label: "Employee Type",
  },
  {
    id: "jobTitle",
    numeric: false,
    disablePadding: false,
    label: "Job Title",
  },
  {
    id: "managerEmail",
    numeric: false,
    disablePadding: false,
    label: "Manager",
  },
  {
    id: "auditStatus",
    numeric: false,
    disablePadding: false,
    label: "Audit Status",
  },
  {
    id: "oktaLastLogin",
    numeric: false,
    disablePadding: false,
    label: "Okta Last Login",
  },
];

const NonFteTable = () => {
  const classes = useStyles();
  const {isDataLoading, auditData} = useContext(NonFteAuditReportContext);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("taskStatus");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box mt={2} minWidth={1050}>
      <Box>
        {auditData ? (
          <>
            {auditData?.length === 0 ? (
              <NoResultsTypography />
            ) : (
              <>
                <TableContainer className={classes.tableContainer}>
                  <Table stickyHeader size="small">
                    <EnhancedTableHead
                      classes={classes}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      headCells={headCells}
                    />
                    {isDataLoading ? (
                      <LoadingCircle />
                    ) : (
                      <TableBody>
                        {stableSort(
                          auditData.map((i) => ({
                            ...i,
                            oktaLastLogin: new Date(i.oktaLastLogin),
                          })),
                          getComparator(order, orderBy)
                        )
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )

                          .map((nonFte) => {
                            return (
                              <StyledTableRow
                                hover
                                tabIndex={-1}
                                id={nonFte.id}
                                key={nonFte.id}
                              >
                                <TableCell>
                                  {nonFte.firstName} {nonFte.lastName}
                                  <Typography
                                    component={"div"}
                                    variant="subtitle2"
                                  >
                                    {nonFte.userName}
                                  </Typography>
                                </TableCell>
                                <TableCell>{nonFte.employeeType}</TableCell>
                                <TableCell>
                                  <Typography
                                    component={"div"}
                                    variant="subtitle1"
                                  >
                                    {nonFte.jobTitle}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    component={"div"}
                                    variant="subtitle1"
                                  >
                                    {nonFte.managerEmail
                                      ? nonFte.managerEmail?.toLowerCase()
                                      : "n/a"}
                                  </Typography>
                                </TableCell>
                                <TableCell>{nonFte.auditStatus}</TableCell>
                                <TableCell>
                                  <Typography
                                    component={"div"}
                                    variant="subtitle1"
                                  >
                                    {nonFte.oktaLastLogin.getTime() ? (
                                      nonFte.oktaLastLogin.toString()
                                    ) : (
                                      <NoResultsTypography variant="subtitle1" />
                                    )}
                                  </Typography>
                                </TableCell>
                              </StyledTableRow>
                            );
                          })}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={auditData?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}{" "}
          </>
        ) : (
          <LoadingCircle />
        )}
      </Box>
    </Box>
  );
};

export default memo(NonFteTable);
