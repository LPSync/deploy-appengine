import React, {memo, useCallback, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {SEARCH_USERNAME} from "../../../operations/queries/searchUsername";
import {connect} from "react-redux";
import {
  setExistingId,
  setSelectedTaskUsername
} from "../../../data/redux/multiCandidateRequest/multiCandidateRequestActions";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";

const CandidateUsername = ({firstName, lastName, id, setSelectedTaskUsername, setExistingId}) => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [index, setIndex] = useState(1);

  const [executeSearch] = useLazyQuery(SEARCH_USERNAME, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      checkUsernameAvailable(data.search_username);
    }
  });

  const checkUsernameAvailable = useCallback((searchUsernames) => {
    if (searchUsernames && newUsername && id) {
      if (firstName.length >= index) {
        if (searchUsernames?.length > 0) {
          searchUsernames?.forEach((user) => {
            if (user.username.toLowerCase() === newUsername) {
              setExistingId(id);
              // if (firstName.length > index) { if (user.status !== "ACTIVE") {setOpen(true);}}
              // else {setOpen(true);}
              setIndex(index + 1);
            }
          });
        } else {
          setSelectedTaskUsername(id, newUsername);
          setCurrentUsername(newUsername);
        }
      } else {
        console.error("Can't find username");
      }
    }
  }, [newUsername, setSelectedTaskUsername, firstName, index, id, setExistingId]);

  const createUsername = useCallback((index) => {
    let username;
    if (firstName && lastName) {
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
    }
  }, [firstName, lastName, setNewUsername]);

  useEffect(() => {
    if (newUsername) {
      executeSearch({variables: {search: newUsername}});
    }
  }, [newUsername]);

  useEffect(() => {
    if (firstName && lastName) {
      createUsername(index);
    }
  }, [firstName, lastName, createUsername, index]);

  return (
    <>
      {!currentUsername ? <LoadingCircle size={24} /> : currentUsername}
    </>
  );
};

export default connect(
  () => ({}), {setSelectedTaskUsername, setExistingId})
(memo(CandidateUsername));