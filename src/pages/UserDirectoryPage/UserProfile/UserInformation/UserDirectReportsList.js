import React, {memo, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {NetworkStatus, useQuery} from "@apollo/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FilterListIcon from "@material-ui/icons/FilterList";
import {GET_DIRECT_REPORTS} from "../../../../operations/queries/getDirectReports";
import UserImg from "../../../../components/UserImg";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import handleError from "../../../../data/handleError";
import FrontendRoutes from "../../../../data/constants/FrontendRoutes";
import StyledTableRow from "../../../../components/table/StyledTableRow";
import ResetFiltersButton from "../../../../components/buttons/ResetFilterButton";
import ApplyFiltersButton from "../../../../components/buttons/ApplyFiltersButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {connect} from "react-redux";
import {setUserDirectReports} from "../../../../data/redux/userDirectory/userDirectoryActions";
import SelectTextField from "../../../../components/inputs/SelectTextfield";

const useStyles = makeStyles((theme) => ({
  employeeInfoDiv: {
    display: "flex",
  },
  box: {
    width: "100%",
  },
  tableRow: {
    cursor: "pointer",
  },
  tableBox: {
    padding: theme.spacing(2),
  },
  tableHeadCell: {
    fontWeight: "bold",
  },
  tableBodyCell: {
    fontSize: ".9rem",
  },
  textField: {width: "40ch"},
  filterBox: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  filterFields: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: theme.spacing(3),
  },
  filterClear: {
    display: "flex",
    justifyContent: "flex-end",
  },
  icon: {
    fontSize: "1.15rem",
  },
  viewBtn: {
    fontSize: ".7rem",
  },
  heading: {
    fontWeight: "bold",
  },
  rootPanel: {
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const UserDirectReportsList = ({
  userInfoExpanded,
  handleUserInfoAccordionChange,
  userData,
  userDirectReports,
  setUserDirectReports,
}) => {
  const classes = useStyles();
  let history = useHistory();
  let {userName} = useParams();
  const [reportsResult, setReportsResult] = useState();
  const [filterOpen, setFilterOpen] = useState(false);
  const [empTypeFilter, setEmpTypeFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const {error, networkStatus, refetch} = useQuery(GET_DIRECT_REPORTS, {
      variables: {search: `${userName}@liveperson.com`},
      onCompleted: (data) => {
        setUserDirectReports(data.get_direct_reports);
        setReportsResult(data.get_direct_reports);
      },
      onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (networkStatus === NetworkStatus.refetch) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [userDirectReports, reportsResult, networkStatus]);

  if (error) return <p>`Error! ${error.message}`</p>;

  const handleOnClick = (user) => {
    history.push(FrontendRoutes.USER_DIRECTORY_PROFILE(user));
  };

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handleClearFilters = () => {
    setEmpTypeFilter("");
    setDepartmentFilter("");
    setReportsResult(userDirectReports);
    setIsFilterApplied(false);
  };

  const handleFilterQuery = () => {
    const filtered = userDirectReports?.filter((user) =>
      (!empTypeFilter || user?.profile?.employeeType === empTypeFilter) &&
      (!departmentFilter || user?.profile?.department === departmentFilter)
    );
    setReportsResult(filtered);
    setIsFilterApplied(true);
  };

  return (
    <>
      {isLoading ? (
        <LoadingCircle />
      ) : (
        userDirectReports?.length > 0 && (
          <Accordion
            expanded={userInfoExpanded === "userPanel2"}
            onChange={handleUserInfoAccordionChange("userPanel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
              classes={{root: classes.rootPanel}}
            >
              <Typography component={"div"} className={classes.heading}>
                Direct Reports
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/*{userDirectReports?.length > 0 ? (*/}
              <Box mt={2} className={classes.box}>
                <Box>
                  <Toolbar>
                    <>
                      <Typography id="tableTitle" component="div">
                        {userData?.profile?.firstName}{" "}
                        {userData?.profile?.lastName} has{" "}
                        {userDirectReports?.[0]?.totalCount} direct reports
                      </Typography>
                      <Box flexGrow={1} />
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleFilterClick}
                      >
                        <FilterListIcon /> Filter{" "}
                        {isFilterApplied && "(Applied)"}
                      </Button>
                    </>
                  </Toolbar>
                </Box>
                <Collapse in={filterOpen} timeout="auto" unmountOnExit>
                  <Box className={classes.filterBox}>
                    <div className={classes.filterFields}>
                      <div>
                        <SelectTextField
                          id="select-employee-type"
                          label="Employee Type"
                          value={empTypeFilter}
                          onValueChange={setEmpTypeFilter}
                          dataList={userDirectReports?.map(
                            (user) => user?.profile?.employeeType
                          )}
                        />
                      </div>
                      <div>
                        <SelectTextField
                          id="select-department"
                          label="Department"
                          value={departmentFilter}
                          onValueChange={setDepartmentFilter}
                          dataList={userDirectReports?.map(
                            (user) => user?.profile?.department
                          )}
                        />
                      </div>
                    </div>
                    <div>
                      <ResetFiltersButton
                        size="small"
                        handleClick={handleClearFilters}
                      />

                      <ApplyFiltersButton
                        size="small"
                        handleClick={handleFilterQuery}
                      />
                    </div>
                  </Box>
                </Collapse>
                <Box className={classes.tableBox}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeadCell}>
                          Employee
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Job Title
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Department
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Employee Type
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reportsResult?.map((user) => (
                        <StyledTableRow
                          hover
                          id={user?.id}
                          key={user?.id}
                          className={classes.tableRow}
                          onClick={() => {
                            handleOnClick(user?.profile?.userName);
                          }}
                        >
                          <TableCell className={classes.tableBodyCell}>
                            <div className={classes?.employeeInfoDiv}>
                              <UserImg small email={user?.profile?.email} />
                              <div>
                                {user?.profile?.firstName}{" "}
                                {user?.profile?.lastName} <br />
                                {user?.profile?.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className={classes.tableBodyCell}>
                            {user?.profile?.jobTitle}
                          </TableCell>
                          <TableCell className={classes.tableBodyCell}>
                            {user?.profile?.department}
                          </TableCell>
                          <TableCell className={classes.tableBodyCell}>
                            {user?.profile?.employeeType}
                          </TableCell>
                          <TableCell className={classes.tableBodyCell}>
                            <Button
                              variant="outlined"
                              size="small"
                              className={classes.viewBtn}
                            >
                              <VisibilityIcon className={classes.icon} /> View
                              profile
                            </Button>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        )
      )}
    </>
  );
};

export default connect(
  (state) => ({
    userData: state.userDirectory.get("userData"),
    userDirectReports: state.userDirectory.get("userDirectReports"),
  }),
  {setUserDirectReports}
)(memo(UserDirectReportsList));
