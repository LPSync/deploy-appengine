import React, {useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Divider,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {UserManagementContext} from "../../UserManagementContextProvider";
import {ADD_ROLE_USER} from "../../../../../operations/adminMutations/addRoleUser";
import {CREATE_LOG_ENTRY} from "../../../../../operations/adminMutations/createLogEntry";
import RemoveUserRoleModal from "../RemoveUserRoleModal";
import handleError from "../../../../../data/handleError";
import {useHistory} from "react-router-dom";
import SearchComponent from "./SearchComponent";
import RoleUsersInfinityTable from "./RoleUsersInfinityTable";
import RoleDetailsTable from "./RoleDetailsTable";
import {DebounceInput} from "react-debounce-input";

export const useStyles = makeStyles((theme) => ({
  box: {overflowY: "auto"},
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
  tableHeadCell: {
    fontWeight: "bold",
    fontSize: ".75rem",
  },
  usersTitleBox: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  addUserBox: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    margin: 40,
  },
  addUserBtn: {
    marginLeft: theme.spacing(1),
    alignSelf: "center",
    minWidth: 100,
  },
  userTableCell: {
    fontSize: ".8rem",
  },
  btn: {
    fontSize: ".75rem",
  },
  icon: {
    fontSize: ".95rem",
  },
}));

const ViewDetailsContent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const {selectedRole} = useContext(UserManagementContext);
  const [addUserError, setAddUserError] = useState(false);
  const [errorSent, setErrorSent] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRemoveRole, setSelectedRemoveRole] = useState("");
  const [selectedRemoveUser, setSelectedRemoveUser] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [addUserLoading, setAddUserLoading] = useState(false);

  const [addRoleUser, {error: addError}] = useMutation(ADD_ROLE_USER, {
    onCompleted: () => onComplete(),
    onError: (error) => handleError(error)(history),
  });

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const createLog = (info, description) => {
    createLogEntry({
      variables: {
        input: {
          logType: "System Settings",
          logNotification: info,
          logDescription: description,
        },
      },
    });
  };

  if (addError && !errorSent) {
    setErrorSent(true);
    createLog(
      "alert",
      `User Management >> Error - New User Added to a Role; errorMsg: ${addError.message}`
    );
  }

  const handleAddRoleUser = (roleId) => {
    if (!selectedUser) {
      setAddUserError(true);
    } else {
      setAddUserLoading(true);
      setAddUserError(false);
      addRoleUser({
        variables: {
          roleId: roleId,
          userId: selectedUser?.userName,
        },
      }).then(() => {
        setAddUserLoading(false);
      });
      createLog(
        "info",
        `User Management >> New User Added to a Role; roleName: ${roleId}; userName: ${selectedUser?.userName};`
      );
    }
  };

  const onComplete = () => {
    props.handleDrawerClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  return (
    <Box className={classes.box}>
      <Toolbar>
        <div>
          <Typography component={"div"} className={classes.heading}>
            Role Details
          </Typography>
        </div>
      </Toolbar>

      <RoleDetailsTable selectedRole={selectedRole} />

      <Divider />

      <Box m={1} className={classes.addUserBox}>
        <SearchComponent
          selected={selectedUser}
          setSelected={setSelectedUser}
        />
        <Button
          size="small"
          color="secondary"
          variant="contained"
          className={classes.addUserBtn}
          disabled={addUserLoading}
          onClick={() => handleAddRoleUser(selectedRole.id)}
        >
          {addUserLoading ? "loading..." : "add user"}
        </Button>
      </Box>

      <Container>
        <Divider />
        <Box className={classes.usersTitleBox}>
          <Toolbar>
            <Box>
              <Typography>Users</Typography>
            </Box>
            <Box flexGrow={1} />
            <Box>
              <DebounceInput
                id="users-search-debounce"
                label="Search Users"
                color="secondary"
                variant="outlined"
                margin="dense"
                autoComplete="off"
                value={searchQuery}
                debounceTimeout={500}
                onChange={(e) => handleSearch(e.target.value)}
                element={TextField}
              />
            </Box>
          </Toolbar>
        </Box>
        <RoleUsersInfinityTable
          selectedRole={selectedRole}
          setSelectedRemoveRole={setSelectedRemoveRole}
          setSelectedRemoveUser={setSelectedRemoveUser}
          handleOpen={handleOpen}
          searchStr={searchQuery}
        />
      </Container>

      {open && (
        <RemoveUserRoleModal
          open={open}
          handleClose={handleClose}
          createLog={createLog}
          selectedRemoveRole={selectedRemoveRole}
          selectedRemoveUser={selectedRemoveUser}
          onComplete={onComplete}
        />
      )}
    </Box>
  );
};

export default ViewDetailsContent;
