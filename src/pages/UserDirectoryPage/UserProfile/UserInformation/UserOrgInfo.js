import React, {memo, useContext, useEffect, useMemo, useState} from "react";
import {
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import {AuthUserContext} from "../../../../AuthUserContextProvider";
import UserProfileLink from "../../../../components/UserProfileLink";
import {useSelector} from "react-redux";
const dateFormat = require("dateformat");

const useStyles = makeStyles(() => ({
  table: {
    maxWidth: 500,
  },
  tableCellKey: {
    borderBottom: "none",
  },
  tableCell: {
    fontWeight: 600,
    borderBottom: "none",
  },
  icons: {
    fontSize: "1.25rem",
  },
  heading: {
    fontWeight: "bold",
  },
}));

const UserOrgInfo = () => {
  const classes = useStyles();
  const userData = useSelector(state => state?.userDirectory.get("userData"));
  const {permUserDirectoryOrgDetailsView} = useContext(AuthUserContext);
  const [tenureMonth, setTenureMonth] = useState();
  const [tenureYear, setTenureYear] = useState();
  const [tenureDay, setTenureDay] = useState();

  useEffect(() => {
    if (userData) {
      getTenure(dateFormat(userData?.profile?.employeeSince, "yyyy-mm-dd"));
    }
  }, [userData]);

  function getTenure(startingDate, endingDate) {
    let isFuture = false;
    var startDate = new Date(
      new Date(startingDate).toISOString().substr(0, 10)
    );

    if (!endingDate) {
      endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    }

    var endDate = new Date(endingDate);
    if (startDate > endDate) {
      isFuture = true;
      var swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    var startYear = startDate.getFullYear();
    var february =
      (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0
        ? 29
        : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var yearDiff = endDate.getFullYear() - startYear;
    var monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    var dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }

    if (isFuture) {
      setTenureMonth(-Math.abs(monthDiff));
      setTenureYear(-Math.abs(yearDiff));
      setTenureDay(-Math.abs(dayDiff));
    } else {
      setTenureMonth(monthDiff);
      setTenureYear(yearDiff);
      setTenureDay(dayDiff);
    }
  }

  const managerUsername = useMemo(() => userData?.profile?.managerEmail?.split("@")?.[0], [userData]);

  return (
    <>
      {userData && (
        <TableContainer>
          <Table
            className={classes.table}
            size="small"
            aria-label="simple table"
          >
            <TableBody>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableCellKey}
                >
                  Username
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  {userData?.profile?.userName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableCellKey}
                >
                  Status
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  {userData?.status}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableCellKey}
                >
                  HRIS ID
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  {userData?.profile?.employeeNumber ? (
                    userData?.profile?.employeeNumber
                  ) : (
                    <p>No HRIS ID</p>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableCellKey}
                >
                  Manager
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  {managerUsername ? (
                    <UserProfileLink
                      name={userData?.profile?.manager || managerUsername}
                      username={managerUsername}
                    />
                  ) : (
                    <p>No Manager</p>
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableCellKey}
                >
                  Employee Type
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  {userData?.profile?.employeeType}
                </TableCell>
              </TableRow>

              {permUserDirectoryOrgDetailsView && (
                <>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tableCellKey}
                    >
                      Employee Since
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {userData?.profile.employeeSince ? (
                        userData?.profile.employeeSince
                      ) : (
                        <p>n/a</p>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tableCellKey}
                    >
                      Current Tenure
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {userData?.profile?.employeeSince ? (
                        <p>
                          {tenureYear !== 0 &&
                            (tenureYear === 1
                              ? `${tenureYear} year `
                              : `${tenureYear} years `)}
                          {tenureMonth !== 0 &&
                            (tenureMonth === 1
                              ? `${tenureMonth} month `
                              : `${tenureMonth} months `)}
                          {tenureDay !== 0 &&
                            (tenureDay === 1
                              ? `${tenureDay} day`
                              : `${tenureDay} days`)}
                        </p>
                      ) : (
                        <p>n/a</p>
                      )}
                    </TableCell>
                  </TableRow>
                  {userData?.profile?.employeeSince !==
                    userData?.profile?.originalHireDate && (
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCellKey}
                      >
                        Original Hire Date
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {userData?.profile?.originalHireDate ? (
                          userData?.profile?.originalHireDate
                        ) : (
                          <p>n/a</p>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default memo(UserOrgInfo);
