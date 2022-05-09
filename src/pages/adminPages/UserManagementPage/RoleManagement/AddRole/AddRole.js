import React, {memo, useCallback, useContext, useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {Box, Container, makeStyles} from "@material-ui/core";
import LoadingCircle from "../../../../../components/circularProgress/LoadingCircle";
import {UserManagementContext} from "../../UserManagementContextProvider";
import {CREATE_NEW_ROLE} from "../../../../../operations/adminMutations/createNewRole";
import {CREATE_LOG_ENTRY} from "../../../../../operations/adminMutations/createLogEntry";
import AddRoleTopMessage from "./AddRoleTopMessage";
import SubmitButtonBox from "./SubmitBottonBox";
import PermissionsTable from "./PermissionsTable";
import AddRoleFrom from "./AddRoleForm";
import PermissionFilterSearchBox from "./PermissionFilterSearchBox";
import MissedInputModal from "../../../../../components/modals/MissedInputModal";

const useStyles = makeStyles(() => ({
  box: {overflow: "auto", height: "55vh"},
}));

const AddRole = ({refetch, isRoleAdded}) => {
  const classes = useStyles();
  const {allPermissions, allRoles} = useContext(UserManagementContext);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");
  const [isNewRoleNameError, setIsNewRoleNameError] = useState(false);
  const [isDuplicateRoleNameError, setIsDuplicateRoleNameError] = useState(
    false,
  );
  const [isBlankRoleNameError, setIsBlankRoleNameError] = useState(false);
  const [isNewRoleDescriptionError, setIsNewRoleDescriptionError] = useState(
    false,
  );
  const [isPermissionsError, setIsPermissionsError] = useState(false);
  const [isChecked, setIsChecked] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [permissionQuery, setPermissionQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const initialIsChecked = allPermissions?.reduce((acc, d) => {
      acc[d.id] = false;
      return acc;
    }, {});
    setIsChecked(initialIsChecked);
    setIsLoading(false);
  }, []);

  const [createNewRole] = useMutation(CREATE_NEW_ROLE, {
    onCompleted: () => {
      setIsLoading(false);
      setNewRoleName("");
      setNewRoleDescription("");
      setIsChecked((current) => {
        const nextIsChecked = {};
        Object.keys(current).forEach((key) => {
          nextIsChecked[key] = false;
        });
        return nextIsChecked;
      });
      refetch();
    },
  });

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const createLog = (description) => {
    createLogEntry({
      variables: {
        input: {
          logType: "System Settings",
          logNotification: "info",
          logDescription: description,
        },
      },
    });
  };

  const handleSingleCheck = useCallback((e) => {
    setIsChecked(currentIsChecked => ({...currentIsChecked, [e.target.value]: e.target.checked}));
    setIsPermissionsError(false);
  }, []);


  const submitNewRole = (roleId, permissionKeys) => {
    let array = permissionKeys?.map((perm) => ({permissionId: perm}));

    createNewRole({
      variables: {
        input: {
          id: roleId,
          roleTitle: newRoleName,
          roleDescription: newRoleDescription,
          permissions: array,
        },
      },
    });
    createLog(
      `User Management >> New Role Created; roleId: ${roleId}; roleName: ${newRoleName}; roleDescription: ${newRoleDescription}; rolePermissions: ${permissionKeys}`,
    );
  };

  const openModal = useCallback(() => {
    setIsLoading(false);
    setOpen(true);
  }, []);

  const handleCheck = (array) => {
    let isValid = true;
    if (!newRoleName?.length) {
      setIsNewRoleNameError(true);
      setIsBlankRoleNameError(true);
      isValid = false;
    }
    const match = allRoles?.some((role) => role?.roleTitle?.toLowerCase() === newRoleName?.toLowerCase());
    if (match) {
      setIsNewRoleNameError(true);
      setIsDuplicateRoleNameError(true);
      isValid = false;
    }
    if (!newRoleDescription?.length) {
      setIsNewRoleDescriptionError(true);
      isValid = false;
    }
    if (!array?.length) {
      setIsPermissionsError(true);
      isValid = false;
    }
    if (!isValid) {
      openModal();
    }
    return isValid;
  };

  const onSubmit = () => {
    setIsLoading(true);
    const permissionKeys = Object.keys(isChecked)?.filter(key => isChecked?.[key]);

    if (handleCheck(permissionKeys)) {
      const reformatted = newRoleName?.replace(/\s+/g, "-").toLowerCase();
      submitNewRole(reformatted, permissionKeys);
    }
  };

  const handleRoleNameChange = useCallback((value) => {
    setNewRoleName(value);
    setIsNewRoleNameError(false);
    setIsBlankRoleNameError(false);
  }, []);

  const handleRoleDescriptionChange = useCallback((value) => {
    setNewRoleDescription(value);
    setIsNewRoleDescriptionError(false);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Container>
      <AddRoleTopMessage isComplete={isRoleAdded} />

      {isLoading ? (
        <LoadingCircle />
      ) : (
        <Box pb={1}>
          <Box className={classes.box}>
            <AddRoleFrom
              isNewRoleNameError={isNewRoleNameError}
              newRoleName={newRoleName}
              handleRoleNameChange={handleRoleNameChange}
              isNewRoleDescriptionError={isNewRoleDescriptionError}
              newRoleDescription={newRoleDescription}
              handleRoleDescriptionChange={handleRoleDescriptionChange}
            />
            <PermissionFilterSearchBox
              title="Permissions"
              permissionQuery={permissionQuery}
              setPermissionQuery={setPermissionQuery}
            />
            <PermissionsTable
              isChecked={isChecked}
              allPermissions={allPermissions}
              handleSingleCheck={handleSingleCheck}
              permissionQuery={permissionQuery}
            />
          </Box>

          <MissedInputModal
            open={open}
            handleClose={handleClose}
            modalMsg={isBlankRoleNameError
              ? "New role name is required!"
              : isNewRoleDescriptionError
                ? "New role description is required!"
                : isPermissionsError
                  ? "Select at least 1 or more permission"
                  : isDuplicateRoleNameError
                    ? "This role name is taken. Please create a different one. "
                    : null}
          />

          <SubmitButtonBox onSubmit={onSubmit} />
        </Box>
      )}
    </Container>
  );
};

export default memo(AddRole);