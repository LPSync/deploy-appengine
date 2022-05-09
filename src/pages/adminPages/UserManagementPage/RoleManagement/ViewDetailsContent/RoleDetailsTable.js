import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import {useStyles} from "./ViewDetailsContent";

const RoleDetailsTable = ({selectedRole}) => {
  const classes = useStyles();
  return (
    <Container>
      <TableContainer>
        <Table size="small" aria-label="role details table">
          <TableBody>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableCellKey}
              >
                Role
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                {selectedRole.roleTitle}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableCellKey}
              >
                Role Description
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                {selectedRole.roleDescription}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableCellKey}
              >
                Permissions
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                {selectedRole.permissions.map((perm) => (
                  <p key={perm.permission.id}>
                    {perm.permission.permissionTitle}
                  </p>
                ))}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableCellKey}
              >
                Total Users
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                {selectedRole.oktaUsers?.length}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RoleDetailsTable;
