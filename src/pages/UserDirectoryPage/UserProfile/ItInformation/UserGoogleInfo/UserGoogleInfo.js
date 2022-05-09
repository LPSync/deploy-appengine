import React, {memo} from "react";
import {
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import GoogleGroupsDrawer from "./GoogleGroupsDrawer";
import { connect } from "react-redux";
import { setIsGoogleGroupsDrawerOpen } from "../../../../../data/redux/userDirectory/userDirectoryActions";

const useStyles = makeStyles(() => ({
  table: {
    maxWidth: "1000",
  },
  tableHead: {fontWeight: 600},
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

const UserGoogleInfo = ({googleUserInfo, setIsGoogleGroupsDrawerOpen}) => {
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
                {googleUserInfo?.suspended}
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
                {googleUserInfo?.lastLoginTime}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableCellKey}
              >
                Group Memberships
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setIsGoogleGroupsDrawerOpen(true);
                  }}
                >
                  View List of Google Groups
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <GoogleGroupsDrawer />
    </>
  );
};

export default connect(
  state => ({googleUserInfo: state.userDirectory.get("googleUserInfo") }),
  {setIsGoogleGroupsDrawerOpen}
)
(memo(UserGoogleInfo));
