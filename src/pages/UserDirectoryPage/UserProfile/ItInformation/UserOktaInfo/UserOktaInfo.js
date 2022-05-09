import React, { memo } from "react";
import {
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import AdGroupsDrawer from "./AdGroupsDrawer";
import AppMembershipsDrawer from "./AppMembershipsDrawer";
import { connect } from "react-redux";
import {
  setIsAdGroupsDrawerOpen,
  setIsAppMembershipsDrawerOpen,
} from "../../../../../data/redux/userDirectory/userDirectoryActions";

const useStyles = makeStyles(() => ({
  table: {
    maxWidth: 700,
  },
  tableHead: { fontWeight: 600 },
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
  keyText: {
    fontSize: "1rem",
  },
  valueText: {
    fontSize: "1rem",
    fontWeight: 600,
  },
  itemContainer: {
    paddingBottom: "1rem",
  },
}));

const UserOktaInfo = ({userData, setIsAdGroupsDrawerOpen, setIsAppMembershipsDrawerOpen}) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableCellKey}
              >
                Account Status
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
                Last Logged In
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                {userData?.lastLogin}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableCellKey}
              >
                AD Group Memberships
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setIsAdGroupsDrawerOpen(true);
                  }}
                >
                  View List of AD Group Memberships
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableCellKey}
              >
                Application Memberships
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setIsAppMembershipsDrawerOpen(true);
                  }}
                >
                  View List of Application Memberships
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <AdGroupsDrawer />
      <AppMembershipsDrawer />
    </>
  );
};

export default connect(
  state => ({userData: state.userDirectory.get("userData")}),
  {setIsAdGroupsDrawerOpen, setIsAppMembershipsDrawerOpen})
(memo(UserOktaInfo));
