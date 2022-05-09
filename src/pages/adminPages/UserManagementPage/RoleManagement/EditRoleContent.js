import React, { useContext, useState } from "react";
import { Box, Button, Chip, Container, makeStyles, TextField, Toolbar, Typography } from "@material-ui/core";
import { UserManagementContext } from "../UserManagementContextProvider";

const useStyles = makeStyles((theme) => ({
  box: { overflowY: "auto" },
  tableCellKey: {
    borderBottom: "none",
    fontSize: ".9rem",
  },
  tableCell: {
    fontWeight: 700,
    borderBottom: "none",
    fontSize: ".9rem",
  },
  heading: {
    fontSize: "1.15rem",
    fontWeight: 600,
  },
  textField: {
    width: "40ch",
  },
  chipBox: {
    width: 500,
    border: ".01rem solid gray",
    borderRadius: "5px",
    padding: theme.spacing(1),
  },
  chip: {
    fontSize: ".75rem",
    margin: ".25rem",
  },
  boxName: {
    fontSize: "1rem",
  },
  submitBtnBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: theme.spacing(2),
  },
  addUserBox: {
    display: "flex",
    alignItems: "center",
  },
}));

const EditRoleContent = () => {
  const {
    selectedUsers,
    selectedRole,
    selectedPermissions,
    setIsDrawerOpen,
  } = useContext(UserManagementContext);
  const classes = useStyles();
  const [roleName, setRoleName] = useState(selectedRole.roleTitle);
  const [roleDescription, setRoleDescription] = useState(
    selectedRole.roleDescription
  );
  const [permissions, setPermissions] = useState(selectedPermissions);
  const [users, setUsers] = useState(selectedUsers);
  const [isRoleNameError, setIsRoleNameError] = useState(false);
  const [isRoleDescriptionError, setIsRoleDescriptionError] = useState(false);
  const [isBlankRoleNameError, setIsBlankRoleNameError] = useState(false);
  const [newUser, setNewUser] = useState();

  const handlePermissionDelete = (chipToDelete) => () => {
    setPermissions((permissions) =>
      permissions.filter(
        (permission) => permission.permissionId !== chipToDelete
      )
    );
  };

  const handleUsersDelete = (chipToDelete) => () => {
    setUsers((users) => users.filter((user) => user !== chipToDelete));
  };

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser("");
  };

  const onSubmit = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box className={classes.box}>
      <Toolbar>
        <div>
          <Typography  component={'div'} className={classes.heading}>
            Edit Role: <strong>{selectedRole.roleTitle}</strong>
          </Typography>
        </div>
      </Toolbar>
      <Container>
        <Box>
          <TextField
            required
            id="edit-role-name"
            label="Edit Role Name"
            color="secondary"
            variant="outlined"
            margin="dense"
            autoComplete="off"
            error={isRoleNameError}
            value={roleName}
            onChange={(e) => {
              setRoleName(e.target.value);
              setIsRoleNameError(false);
              setIsBlankRoleNameError(false);
            }}
            className={classes.textField}
          />
        </Box>

        <Box>
          <TextField
            required
            id="edit-role-description"
            label="Edit Role Description"
            color="secondary"
            variant="outlined"
            margin="dense"
            autoComplete="off"
            multiline
            minRows={2}
            maxRows={4}
            error={isRoleDescriptionError}
            value={roleDescription}
            onChange={(e) => {
              setRoleDescription(e.target.value);
              setIsRoleDescriptionError(false);
            }}
            className={classes.textField}
          />
        </Box>

        <Box my={2}>
          <Typography component={'div'} className={classes.boxName}>Edit Permissions</Typography>
          <Box className={classes.chipBox}>
            {permissions.map((perm) => (
              <span key={perm.permissionId}>
                <Chip
                  onDelete={handlePermissionDelete(perm.permissionId)}
                  size="small"
                  label={perm.permissionTitle}
                  className={classes.chip}
                  variant="outlined"
                />
              </span>
            ))}
          </Box>
        </Box>

        <Box my={2}>
          <Typography component={'div'} className={classes.boxName}>Edit Users</Typography>
          <Box className={classes.chipBox}>
            {users.map((user) => (
              <span key={user}>
                <Chip
                  onDelete={handleUsersDelete(user)}
                  size="small"
                  label={user}
                  className={classes.chip}
                  variant="outlined"
                />
              </span>
            ))}
          </Box>
          <Box className={classes.addUserBox}>
            <TextField
              size="small"
              id="add-user"
              label="Type in Username to Add"
              color="secondary"
              variant="outlined"
              margin="dense"
              autoComplete="off"
              value={newUser}
              onChange={(e) => {
                setNewUser(e.target.value);
              }}
              className={classes.textField}
            />
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => handleAddUser()}
            >
              Add User
            </Button>
          </Box>
        </Box>
      </Container>

      <Box className={classes.submitBtnBox}>
        <Button
          variant="contained"
          color="secondary"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default EditRoleContent;
