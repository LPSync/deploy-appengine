import React, {memo, useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import clsx from "clsx";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  SEARCH_NFTE_USERS_QUERY,
  SEARCH_USERS_QUERY,
} from "../../../operations/queries/searchUsersQuery";
import handleError from "../../../data/handleError";
import SelectCircularProgress from "../../../components/circularProgress/SelectCircularProgress";
import NoResultsTypography from "../../../components/typographies/NoResultsTypography";
import useDebouncedChangeHandler from "../../../hooks/useDebouncedChangeHandler";

const useStyles = makeStyles((theme) => ({
  box: {position: "relative"},
  textField: {
    width: "60ch",
  },
  resultsBox: {
    position: "absolute",
    zIndex: 1,
    width: "60ch",
    border: "1px solid " + theme.palette.secondary.main,
    maxHeight: "20rem",
    overflow: "auto",
  },
}));

const AllEmployeeSelect = ({
  type,
  selectedOffboardUser,
  setSelectedOffboardUser,
  setIsSelectedLoading,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [usersData, setUsersData] = useState();
  const [resultsOpen, setResultsOpen] = useState(false);
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  const [executeSearch] = useLazyQuery(
    type === "NonFte" ? SEARCH_NFTE_USERS_QUERY : SEARCH_USERS_QUERY,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        const result =
          type === "NonFte" ? data?.search_nfte_users : data?.search_users;
        setUsersData(
          result?.filter((user) => user?.profile?.employeeNumber !== "100001")
        );
        setIsResultsLoading(false);
      },
      onError: (error) => handleError(error)(history),
    }
  );

  useEffect(() => {
    if (searchQuery?.length) {
      executeSearch({variables: {search: searchQuery}});
      setSelectedOffboardUser("");
    } else {
      setUsersData();
      setResultsOpen(false);
    }
  }, [searchQuery, executeSearch, setUsersData, setResultsOpen]);

  const handleClick = (selectedUser) => {
    setSelectedOffboardUser(selectedUser);
    setIsSelectedLoading(true);

    setSearchQuery("");
  };

  const searchOnChange = useCallback((value) => {
    setIsResultsLoading(true);
    setResultsOpen(true);
    setSearchQuery(value);
  }, []);

  const debouncedChangeHandler = useDebouncedChangeHandler(searchOnChange);
  useEffect(() => {debouncedChangeHandler(query)}, [query]);

  return (
    <>
      {!selectedOffboardUser && (
        <Box className={clsx(selectedOffboardUser && classes.box)}>
          <TextField
            required
            id="standard-basic"
            label="Search"
            variant="standard"
            helperText="Search by Name, Email, or HRIS ID"
            color="secondary"
            size="small"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={classes.textField}
          />

          {searchQuery?.length > 0 && (
            <Collapse in={resultsOpen} timeout="auto" unmountOnExit>
              <Box className={classes.resultsBox}>
                <Paper>
                  {isResultsLoading && <SelectCircularProgress />}
                  {!usersData?.length && !isResultsLoading ? (
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
                            onClick={() => handleClick(user)}
                          >
                            <ListItemText
                              primary={
                                <>
                                  <Typography
                                    component={"div"}
                                    variant="subtitle1"
                                  >
                                    {user.profile.firstName}{" "}
                                    {user.profile.lastName} |{" "}
                                    {user.profile.location} |{" "}
                                    {user.profile.jobTitle}
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
                </Paper>
              </Box>
            </Collapse>
          )}
        </Box>
      )}
    </>
  );
};

export default memo(AllEmployeeSelect);
