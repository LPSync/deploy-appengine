import React, {memo, useCallback, useEffect, useState} from "react";
import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import {SEARCH_USERS_QUERY} from "../../../operations/queries/searchUsersQuery";
import handleError from "../../../data/handleError";
import {getProfileNameAndInfo} from "../../../data/helper/helpers";
import NoResultsTypography from "../../typographies/NoResultsTypography";
import SelectCircularProgress from "../../circularProgress/SelectCircularProgress";
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
  selectedContainer: {
    width: 600,
    marginLeft: 0,
    border: "1px solid " + theme.palette.warning.main,
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
}));

const TransferWhoSelect = ({selectedTransferUser, setSelectedTransferUser}) => {
  const classes = useStyles();
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState();
  const [resultsOpen, setResultsOpen] = useState(false);
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  const [executeSearch, {data}] = useLazyQuery(SEARCH_USERS_QUERY, {
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if(data) {
      setUsersData(data?.search_users);
      setIsResultsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      executeSearch({variables: {search: searchQuery}});
    } else if (searchQuery?.length === 0) {
      setUsersData("");
      setResultsOpen(false);
    }
  }, [searchQuery, executeSearch]);

  const handleClick = (selected) => {
    setSelectedTransferUser(selected);
    setSearchQuery("");
  };

  const handleClear = () => {
    setSelectedTransferUser("");
  };

  const searchOnChange = useCallback((value) => {
    setIsResultsLoading(true);
    setResultsOpen(true);
    setSearchQuery(value);
  }, []);

  const debouncedChangeHandler = useDebouncedChangeHandler(searchOnChange);
  useEffect(() => {debouncedChangeHandler(query)}, [query]);

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Search &amp; select who to transfer to" />
      </Grid>
      <Grid item xs={8}>
        <Box>
          <>
            {!selectedTransferUser && (
              <>
                <Box>
                  <Typography component={"div"} variant="subtitle2">
                    If transfer user is not selected, default will be
                    "livepersondrive@liveperson.com"
                  </Typography>
                </Box>
                <Box mb={2} className={classes.box}>
                  <TextField
                    label="Search"
                    variant="standard"
                    helperText="Search by Name, Email, or HRIS ID"
                    color="secondary"
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
                                        onClick={() => handleClick(user)}
                                      >
                                        <ListItemText
                                          primary={
                                            <Typography
                                              component={"div"}
                                              variant="subtitle1"
                                            >
                                              {getProfileNameAndInfo(
                                                user?.profile
                                              )}
                                            </Typography>
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
              </>
            )}
            {selectedTransferUser && (
              <>
                <Box mt={2}>
                  <Box mb={1} mt={2}>
                    {selectedTransferUser?.profile?.email ===
                    "livepersondrive@liveperson.com"
                      ? "Default:"
                      : "Selected:"}
                  </Box>
                  <Container m={1} className={classes.selectedContainer}>
                    {selectedTransferUser?.profile?.email ===
                    "livepersondrive@liveperson.com" ? (
                      "livepersondrive@liveperson.com"
                    ) : (
                      <>
                        {" "}
                        {selectedTransferUser?.profile?.firstName}{" "}
                        {selectedTransferUser?.profile?.lastName} |{" "}
                        {selectedTransferUser?.profile?.location} |{" "}
                        {selectedTransferUser?.profile?.jobTitle}{" "}
                      </>
                    )}
                  </Container>
                </Box>
                <Box mt={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleClear()}
                  >
                    Clear Selected
                  </Button>
                </Box>
              </>
            )}
          </>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(TransferWhoSelect);
