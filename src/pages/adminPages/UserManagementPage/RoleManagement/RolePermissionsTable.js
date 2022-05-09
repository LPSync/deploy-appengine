import React, {useContext, useEffect} from "react";
import {useMutation} from "@apollo/client";
import {
  Box,
  Chip,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {DELETE_ROLE} from "../../../../operations/adminMutations/deleteRole";
import {UserManagementContext} from "../UserManagementContextProvider";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import DrawerComponent from "../DrawerComponent";
import ViewDetailsContent from "./ViewDetailsContent/ViewDetailsContent";
import StyledTableRow from "../../../../components/table/StyledTableRow";
import DeleteButton from "../../../../components/buttons/DeleteButton";
import ViewButton from "../../../../components/buttons/ViewButton";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "800px",
  },
  tableBox: {
    overflow: "auto",
    height: "calc(95vh - 250px)",
    minHeight: "500px",
    padding: theme.spacing(3),
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  tableHeadCell: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  btn: {
    fontSize: ".7rem",
  },
  chip: {
    fontSize: ".75rem",
  },
  alert: {
    width: "100%",
    "& > * + *": {marginTop: theme.spacing(2)},
  },
}));

const RolePermissionsTable = (props) => {
  const classes = useStyles();
  const {
    allRoles,
    setIsDrawerOpen,
    setSelectedRole,
    isViewDetailsContent,
    setIsViewDetailsContent,
  } = useContext(UserManagementContext);

  useEffect(() => {}, [allRoles]);

  const [deleteRole, {loading}] = useMutation(DELETE_ROLE, {
    onCompleted: () => onComplete(),
  });

  const onComplete = () => {
    props.setAlertMsg("Role deleted");
    props.setIsComplete(true);
    props.refetch();
    resetComplete();
  };

  const resetComplete = () => {
    setTimeout(() => {
      props.setIsComplete(false);
    }, 5000);
  };

  const handleViewBtn = (role) => {
    setIsDrawerOpen(true);
    setIsViewDetailsContent(true);
    setSelectedRole(role);
  };

  const handleDeleteRole = (id) => {
    deleteRole({
      variables: {
        id: id,
      },
    });
  };

  const handleDrawerClose = () => {
    props.refetch();
    setIsViewDetailsContent(false);
    setIsDrawerOpen(false);
  };

  return (
    <Box>
      {loading ? (
        <LoadingCircle />
      ) : (
        <>
          {allRoles && (
            <>
              <Box className={classes.tableBox}>
                <TableContainer>
                  <Table size="small" className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeadCell}>
                          Role
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Permissions
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Users
                        </TableCell>
                        <TableCell>View</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      {allRoles?.map((role) => (
                        <React.Fragment key={role.id}>
                          <StyledTableRow
                            id={role.id}
                            key={role.id}
                            className={classes.tableRow}
                          >
                            <TableCell>
                              <div>{role.roleTitle}</div>
                            </TableCell>
                            <TableCell>
                              {role.permissions?.map((perm) => (
                                <Chip
                                  id={perm.permission.id}
                                  size="small"
                                  variant="outlined"
                                  key={perm.permission.id}
                                  label={perm.permission.permissionTitle}
                                  className={classes.chip}
                                />
                              ))}
                            </TableCell>

                            <TableCell>{role?.oktaUsersTotal}</TableCell>
                            <TableCell>
                              <ViewButton
                                text={"View Details"}
                                className={classes.btn}
                                onClick={() => handleViewBtn(role)}
                              />
                            </TableCell>

                            <TableCell>
                              {role.oktaUsers?.length === 0 &&
                                !role.roleLocked && (
                                  <DeleteButton
                                    onClick={() => handleDeleteRole(role.id)}
                                  />
                                )}
                            </TableCell>
                          </StyledTableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <DrawerComponent>
                {isViewDetailsContent && (
                  <ViewDetailsContent handleDrawerClose={handleDrawerClose} />
                )}
              </DrawerComponent>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default RolePermissionsTable;
