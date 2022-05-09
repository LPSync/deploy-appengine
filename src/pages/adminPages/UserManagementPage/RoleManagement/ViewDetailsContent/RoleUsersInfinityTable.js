import React, {useEffect, useState} from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import StyledTableRow from "../../../../../components/table/StyledTableRow";
import dateFormat from "dateformat";
import DeleteIcon from "@material-ui/icons/Delete";
import BoxTableWrapper from "../../../../../components/table/BoxTableWrapper";
import {useLazyQuery} from "@apollo/client";
import {GET_OKTA_USERS_BY_ROLE_ID} from "../../../../../operations/queries/getOktaUsersByRoleId";
import handleError from "../../../../../data/handleError";
import {useHistory} from "react-router-dom";
import {useStyles} from "./ViewDetailsContent";

const RoleUsersInfinityTable = ({
  selectedRole,
  handleOpen,
  setSelectedRemoveUser,
  setSelectedRemoveRole,
  searchStr,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [rowsPerPage] = useState(20);
  const [roleUsersData, setRoleUsersData] = useState(null);
  const [preventFirstRun, setPreventFirstRun] = useState(true);

  const [getOktaUsersByRoleId, {loading: roleUsersLoading}] = useLazyQuery(
    GET_OKTA_USERS_BY_ROLE_ID,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => setUsers(data?.get_okta_users_by_role_id),
      onError: (error) => handleError(error)(history),
    }
  );

  const setUsers = (result) => {
    setRoleUsersData((prev) => {
      return prev ? prev.concat(result) : result;
    });
    if (result?.length < rowsPerPage) {
      setHasMore(false);
    }
  };

  const loadUsers = () => {
    getOktaUsersByRoleId({
      variables: {
        id: selectedRole.id,
        take: rowsPerPage,
        skip: offset,
        search: searchStr.trim(),
      },
    });
  };

  useEffect(() => {
    if (hasMore) {
      loadUsers();
    }
  }, [selectedRole.roleId, offset]);

  useEffect(() => {
    if (!preventFirstRun) {
      setHasMore(true);
      setRoleUsersData(null);
      if (offset === 0) loadUsers();
      else setOffset(0);
    } else setPreventFirstRun(false);
  }, [searchStr]);

  function loadNextData() {
    setOffset((prevState) => prevState + rowsPerPage);
  }

  return (
    <BoxTableWrapper
      id="infinity-scroll-role"
      hasMore={hasMore}
      loading={roleUsersLoading}
      next={loadNextData}
      dataLength={roleUsersData?.length || 0}
    >
      <TableContainer id="infinity-scroll-role">
        <Table size="small" aria-label="role users table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>Username</TableCell>
              <TableCell className={classes.tableHeadCell} style={{width: 100}}>
                First Name
              </TableCell>
              <TableCell className={classes.tableHeadCell}>Last Name</TableCell>
              <TableCell className={classes.tableHeadCell}>
                Last Login
              </TableCell>

              <TableCell className={classes.tableHeadCell}>
                Remove User
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleUsersData &&
              roleUsersData?.map((user) => {
                return (
                  <StyledTableRow id={user?.user.id} key={user.user.id}>
                    <TableCell className={classes.userTableCell}>
                      <div>{user?.user?.userName}</div>
                    </TableCell>
                    <TableCell className={classes.userTableCell}>
                      {user?.user?.firstName}
                    </TableCell>
                    <TableCell className={classes.userTableCell}>
                      {user?.user?.lastName}
                    </TableCell>
                    <TableCell className={classes.userTableCell}>
                      {dateFormat(
                        new Date(parseInt(user?.user?.lastLogin)).toISOString(),
                        "mmmm d, yyyy h:MM TT Z"
                      )}
                    </TableCell>
                    <TableCell className={classes.userTableCell}>
                      <Button
                        variant="outlined"
                        size="small"
                        className={classes.btn}
                        onClick={() => {
                          setSelectedRemoveRole(selectedRole.id);
                          setSelectedRemoveUser(user?.user?.userName);
                          handleOpen();
                        }}
                      >
                        <DeleteIcon className={classes.icon} />
                        Remove
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxTableWrapper>
  );
};

export default RoleUsersInfinityTable;
