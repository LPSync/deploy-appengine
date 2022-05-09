import React, {memo, useCallback, useContext, useEffect, useState} from "react";
import {NetworkStatus, useQuery} from "@apollo/client";
import {Box, Button, makeStyles, Toolbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {GET_PERMISSIONS} from "../../../../operations/adminQueries/getPermissions";
import {GET_ROLES} from "../../../../operations/adminQueries/getRoles";
import {UserManagementContext} from "../UserManagementContextProvider";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import RolePermissionsTable from "./RolePermissionsTable";
import AddRole from "./AddRole/AddRole";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import {GET_ALL_OKTA_USERS} from "../../../../operations/queries/getAllOktaUsers";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "800px",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.15rem",
  },
  tableBox: {overflow: "auto", height: "55vh", padding: theme.spacing(3)},
  title: {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  tableHeadCell: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
}));

const RoleManagement = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    allRoles,
    setAllRoles,
    allPermissions,
    setAllPermissions,
    isAddRoleOpen,
    setIsAddRoleOpen,
    setAllPermissionUsers,
  } = useContext(UserManagementContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [isRoleAdded, setIsRoleAdded] = useState(false);

  const {loading, refetch, networkStatus} = useQuery(GET_ROLES, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => setAllRoles(data.get_roles),
    onError: (error) => handleError(error)(history),
  });

  const refetchRoles = useCallback(() => {
    setIsRoleAdded(true);
    refetch();
    setTimeout(() => {
      setIsRoleAdded(false);
    }, 7000);
  }, [refetch]);

  useQuery(GET_PERMISSIONS, {
    onCompleted: (data) => setAllPermissions(data.get_permissions),
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (loading || networkStatus === NetworkStatus.refetch) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading, networkStatus, allRoles]);

  useQuery(GET_ALL_OKTA_USERS, {
    onCompleted: (data) => setAllPermissionUsers(data.get_all_okta_users),
    onError: (error) => handleError(error)(history),
  });

  return (
    <>
      {isComplete && (
        <Box className={classes.alert} my={1}>
          <Alert severity="success">{alertMsg}</Alert>
        </Box>
      )}
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <Box mt={3} minWidth={1050}>
          <Toolbar>
            <Box flexGrow={1} />
            {isAddRoleOpen ? (
              <Button
                size="small"
                color="secondary"
                variant="outlined"
                onClick={() => {
                  setIsAddRoleOpen(false);
                }}
              >
                <ArrowBackIosIcon /> Back
              </Button>
            ) : (
              <Box>
                <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  onClick={() => setIsAddRoleOpen(true)}
                >
                  Add Role
                </Button>
              </Box>
            )}
          </Toolbar>
          {isAddRoleOpen ? (
            <AddRole refetch={refetchRoles} isRoleAdded={isRoleAdded}/>
          ) : (
            <>
              {allRoles && allPermissions && (
                <div>
                  <RolePermissionsTable
                    refetch={refetch}
                    setIsComplete={setIsComplete}
                    setAlertMsg={setAlertMsg}
                  />
                </div>
              )}
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default memo(RoleManagement);
