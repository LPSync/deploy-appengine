import React, {useState, useEffect, memo, useCallback} from "react";
import {useLazyQuery} from "@apollo/client";
import {Box, Grid, Typography} from "@material-ui/core";
import {SEARCH_USERNAME} from "../../../operations/queries/searchUsername";
import RequestFormLabel from "../../typographies/RequestFormTypography";
import AlreadyExistUsernameModal from "../../modals/AlreadyExistUsernameModal";
import WarningIcon from "@material-ui/icons/Warning";

const UsernameCreate = ({
  firstName,
  lastName,
  setUsername,
  usernameError,
  setUsernameError,
}) => {
  const [newUsername, setNewUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(1);

  const checkUsernameAvailable = (obj) => {
    if (obj?.username) {
      if (obj.username.toLowerCase() === newUsername) {
        if (firstName.length > index) {
          setIndex(index + 1);
          createUsername();

          if (obj.status !== "ACTIVE") {
            setOpen(true);
          }
        } else {
          setOpen(true);
        }
      }
    } else {
      setUsername(newUsername);
    }
  };

  const [executeSearch] = useLazyQuery(SEARCH_USERNAME, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => checkUsernameAvailable(data?.search_username),
  });

  const createUsername = useCallback(() => {
    if (usernameError) {
      setUsernameError(false);
    }
    let username;

    const first = firstName
      .replace(/-|\s/g, "")
      .substring(0, index)
      .toLowerCase();
    const last = lastName.replace(/-|\s/g, "").toLowerCase();

    const combinedName = first + last;
    if (combinedName?.length > 15) {
      username = combinedName.substring(0, 15);
    } else {
      username = combinedName;
    }

    setNewUsername(username);
    executeSearch({variables: {search: username}});
  }, [firstName, lastName, executeSearch, index, setNewUsername]);

  useEffect(() => {
    if (firstName && lastName) {
      createUsername();
    } else {
      setNewUsername("");
    }
  }, [firstName, lastName, createUsername]);

  useEffect(() => {
    if (index !== 1) {
      setIndex(1);
    }
  }, [firstName]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <RequestFormLabel title="Username" subtitle="(auto-generated)" />
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Typography component={"div"}>{newUsername}</Typography>
            {usernameError && <WarningIcon style={{color: "#ff0000"}} />}
          </Box>
        </Grid>
      </Grid>
      {open && (
        <AlreadyExistUsernameModal open={open} handleClose={handleClose} />
      )}
    </>
  );
};

export default memo(UsernameCreate);
