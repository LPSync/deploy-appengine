import React, { memo, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import {
  Box,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
} from "@material-ui/core";
import { AuthUserContext } from "../../../../AuthUserContextProvider";
import { GET_AUDITOR_NONFTE_REPORTS } from "../../../../operations/queries/getAuditorNonfteReports";
import UpdateAuditDrawer from "./UpdateAuditDrawer";
import handleError from "../../../../data/handleError";
import StyledTableRow from "../../../../components/table/StyledTableRow";
import { getComparator, stableSort } from "../../../../data/helper/helpers";
import EnhancedTableHead from "../../../../components/table/EnhancedTableHead";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import { connect } from "react-redux";
import FrontendRoutes from "../../../../data/constants/FrontendRoutes";
import { setSelectedOffboardUser } from "../../../../data/redux/offboardRequest/offboardRequestActions";
import {
  setIsAuditDrawerOpen,
  setSelectedAuditUser,
} from "../../../../data/redux/userDirectory/userDirectoryActions";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "20rem",
  },
  tableBox: {
    padding: theme.spacing(2),
  },
  tableHeadCell: {
    fontWeight: "bold",
    background: "#16173f",
  },
  tableBodyCell: {
    fontSize: ".9rem",
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
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "employeeType",
    numeric: false,
    disablePadding: false,
    label: "EmployeeType",
  },
  {
    id: "auditStatus",
    numeric: false,
    disablePadding: false,
    label: "Audit Status",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

const NonFteAudit = ({setSelectedOffboardUser, userData, setSelectedAuditUser, setIsAuditDrawerOpen}) => {
  const classes = useStyles();
  const history = useHistory();
  const { authUser, authUserDirectReports } = useContext(AuthUserContext);
  const [nonFtes, setNonFtes] = useState();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [executeSearch, {loading}] = useLazyQuery(GET_AUDITOR_NONFTE_REPORTS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => getNonFtes(data.get_auditor_nonfte_reports),
    onError: error => handleError(error)(history)
  });

  useEffect(() => {
    if (authUser?.profile?.userName === userData?.profile?.userName) {
      if (authUserDirectReports?.length > 0) {
        executeSearch();
      } else {
        setNonFtes([]);
      }
    }
  }, [authUserDirectReports, executeSearch, authUser, userData]);

  const getNonFtes = async (auditorData) => {
    const filteredReports = await authUserDirectReports.filter(
      (report) =>
        report.profile.employeeType.includes("Contractor") ||
        report.profile.employeeType.includes("Partner")
    );

    if (auditorData?.length > 0) {
      auditorData.forEach((data) => {
        if (data.auditCompleted) {
          filteredReports.splice(
            filteredReports.findIndex(
              ({ profile }) => profile.email === data.auditUserEmail
            ),
            1
          );
        } else {
          const foundIndex = filteredReports.findIndex(
            ({ profile }) => profile.email === data.auditUserEmail
          );
          filteredReports[foundIndex] = {
            ...filteredReports[foundIndex],
            auditStatus: data.auditUserStatus,
          };
        }
      });
      setNonFtes(filteredReports);
    } else {
      setNonFtes(filteredReports);
    }
  };

  const handleOnSelectedClick = (user) => {
    setSelectedAuditUser(user);
    setIsAuditDrawerOpen(true);
  };

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

  const handleOffboardUser = (user) => {
    console.log({user})
    setSelectedOffboardUser(user);
  }

  return (
    <>
      <Box mb={2}>
        <Typography component={'div'}>
          Please review your non-full time employee direct reports and ensure
          they're audited correctly.
        </Typography>
      </Box>
      {loading ?  <LoadingCircle text={"loading..."} />
        :(
        <>
          {nonFtes?.length > 0 ? (
            <Box>
              <TableContainer className={classes.tableContainer}>
                <Table stickyHeader size="small">
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    className={classes.tableHeadCell}
                    headCells={headCells}
                  />

                  <TableBody className={classes.tableBody}>
                    {stableSort(nonFtes, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(user => {
                        return (
                          <StyledTableRow
                            tabIndex={-1}
                            id={user.id}
                            key={user.id}
                          >
                            <TableCell className={classes.tableBodyCell}>
                              {user.profile.firstName} {user.profile.lastName}
                              <br />
                              {user.profile.email}
                            </TableCell>
                            <TableCell className={classes.tableBodyCell}>
                              {user.profile.employeeType}
                            </TableCell>
                            <TableCell className={classes.tableBodyCell}>
                              {user.auditStatus
                                ? user.auditStatus
                                : "Not audited"}
                            </TableCell>
                            <TableCell className={classes.tableBodyCell}>
                              {user.auditStatus &&
                              user.auditStatus ===
                                "User needs to be offboarded" ? (
                                <Box>
                                  <Button
                                    size="small"
                                    onClick={() => handleOffboardUser(user)}
                                    component={Link}
                                    to={FrontendRoutes.OFFBOARD_EMPLOYEE}
                                    variant="contained"
                                  >
                                    Offboard User
                                  </Button>
                                </Box>
                              ) : (
                                <Button
                                  variant="outlined"
                                  size="small"
                                  onClick={() => {
                                    handleOnSelectedClick(user);
                                  }}
                                >
                                  Update Audit Status
                                </Button>
                              )}
                            </TableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={nonFtes?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          ) : (
            <Box ml={3}>
              <Typography component={'div'}>
                You have no non-full time direct reports to audit
              </Typography>
            </Box>
          )}
          <UpdateAuditDrawer runSearch={executeSearch} />
        </>
      )}
    </>
  );
};

export default connect(
  state => ({ userData: state.userDirectory.get("userData")}),
  {setSelectedOffboardUser, setSelectedAuditUser, setIsAuditDrawerOpen})
(memo(NonFteAudit));
