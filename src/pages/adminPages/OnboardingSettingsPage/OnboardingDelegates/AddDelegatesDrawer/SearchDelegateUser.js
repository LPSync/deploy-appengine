import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import CustomTextField from "../../../../../components/inputs/CustomTextField";
import SelectCircularProgress from "../../../../../components/circularProgress/SelectCircularProgress";
import NoResultsTypography from "../../../../../components/typographies/NoResultsTypography";
import {SEARCH_USERS_QUERY} from "../../../../../operations/queries/searchUsersQuery";
import handleError from "../../../../../data/handleError";

const SearchDelegateUser = ({delegateUser, setDelegateUser}) => {
  const history = useHistory();
  const [isUserSearchLoading, setIsUserSearchLoading] = useState(false);
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [isUserResultsOpen, setIsUserResultsOpen] = useState(false);
  const [usersData, setUsersData] = useState();

  const [executeSearch] = useLazyQuery(SEARCH_USERS_QUERY, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setUsersData(data.search_users);
      setIsUserSearchLoading(false);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (searchUserQuery?.length > 0) {
      executeSearch({variables: {search: searchUserQuery}});
      setIsUserResultsOpen(true);
    } else {
      setIsUserResultsOpen(false);
      setUsersData([]);
      setIsUserSearchLoading(false);
    }
  }, [searchUserQuery, executeSearch]);

  const searchUserOnChange = (query) => {
    setIsUserSearchLoading(true);
    setSearchUserQuery(query);
  };

  const handleUserClick = (user) => {
    setDelegateUser(user.toLowerCase());

    setIsUserResultsOpen(false);
    setSearchUserQuery("");
  };

  return (
    <div>
      <Box m={2}>
        {!delegateUser ? (
          <Box>
            <Typography>Search for a Delegate User</Typography>
            <CustomTextField
              required
              id="standard-basic"
              label="Search"
              variant="standard"
              size="small"
              autoComplete="off"
              value={searchUserQuery}
              onValueChange={searchUserOnChange}
            />
            {searchUserQuery?.length > 0 && (
              <Collapse in={isUserResultsOpen} timeout="auto" unmountOnExit>
                <Box>
                  <Paper>
                    {isUserSearchLoading && <SelectCircularProgress />}
                    {usersData && (
                      <>
                        {usersData?.length === 0 ? (
                          <Box m={1}>
                            <NoResultsTypography />
                          </Box>
                        ) : (
                          <List>
                            {usersData?.map((user) => (
                              <React.Fragment key={user.id}>
                                <ListItem
                                  key={user.id}
                                  button
                                  onClick={() =>
                                    handleUserClick(user?.profile.userName)
                                  }
                                >
                                  <ListItemText
                                    primary={
                                      <>
                                        <Typography
                                          component={"div"}
                                          variant="subtitle1"
                                        >
                                          {user?.profile.firstName}{" "}
                                          {user?.profile.lastName} |{" "}
                                          {user?.profile.userName}
                                        </Typography>
                                      </>
                                    }
                                  />
                                </ListItem>
                                {usersData?.length > 1 && <Divider />}
                              </React.Fragment>
                            ))}
                          </List>
                        )}
                      </>
                    )}
                  </Paper>
                </Box>
              </Collapse>
            )}
          </Box>
        ) : (
          <Box>
            <Typography>
              Selected Delegate User: <strong>{delegateUser}</strong>
            </Typography>
            <Box mt={1}>
              <Button
                size="small"
                variant="contained"
                onClick={() => setDelegateUser("")}
              >
                Clear Selected
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default SearchDelegateUser;
