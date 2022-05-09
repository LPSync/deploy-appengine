import React, {useCallback, useContext, useEffect, useState} from "react";
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
import {useLazyQuery} from "@apollo/client";
import {SEARCH_USERS_QUERY} from "../../../../operations/queries/searchUsersQuery";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import SelectCircularProgress from "../../../../components/circularProgress/SelectCircularProgress";
import NoResultsTypography from "../../../../components/typographies/NoResultsTypography";
import useDebouncedChangeHandler from "../../../../hooks/useDebouncedChangeHandler";

const useStyles = makeStyles((theme) => ({
  box: {position: "relative"},
  leftText: {
    paddingLeft: theme.spacing(5),
  },
  textField: {
    width: "60ch",
  },
  resultsBox: {
    position: "absolute",
    zIndex: 2,
    width: "60ch",
    border: "1px solid " + theme.palette.secondary.main,
    maxHeight: "20rem",
    overflow: "auto",
  },
  selectedContainer: {
    width: "60ch",
    marginLeft: 0,
    border: "1px solid " + theme.palette.warning.main,
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
}));

const ManagerSelect = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    selectedManager,
    setSelectedManager,
    selectedManagerError,
    setSelectedManagerError,
    setManagerCostCenter,
    setSelectedCompanyCode,
    setSelectedParentMgmtCostCenter,
    setSelectedMgmtCostCenter,
    setSelectedFunctionalAreaDesc,
    setSelectedCountryDesc,
    setIsBackfillChecked,
    setSelectedBackfill,
  } = useContext(RequisitionRequestContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [usersData, setUsersData] = useState();
  const [resultsOpen, setResultsOpen] = useState(false);
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  const [executeSearch] = useLazyQuery(SEARCH_USERS_QUERY, {
    onCompleted: (data) => {
      setUsersData(data?.search_users);
      setIsResultsLoading(false);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (searchQuery?.length > 0) {
      executeSearch({variables: {search: searchQuery}});
    } else if (searchQuery?.length === 0) {
      setResultsOpen(false);
      setUsersData("");
    }
  }, [searchQuery, executeSearch]);

  const handleClick = (selected) => {
    setSelectedManager(selected);
    setSelectedManagerError(false);
    setSearchQuery("");
  };

  const clearSelectedManager = () => {
    setSelectedManager("");
    setIsBackfillChecked(false);
    setSelectedBackfill();
    setManagerCostCenter();
    setSelectedCompanyCode();
    setSelectedParentMgmtCostCenter();
    setSelectedMgmtCostCenter();
    setSelectedFunctionalAreaDesc();
    setSelectedCountryDesc();
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
        <Typography
          component={"div"}
          variant="subtitle1"
          className={classes.leftText}
        >
          Select hiring manager
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Box>
          <>
            {!selectedManager && (
              <Box mb={2} className={classes.box}>
                <TextField
                  required
                  label="Search"
                  variant="standard"
                  helperText="Search by Name, Email, or HRIS ID"
                  color="secondary"
                  size="small"
                  autoComplete="off"
                  error={selectedManagerError}
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
                                {usersData.map((user) => (
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
                          </>
                        )}
                      </Paper>
                    </Box>
                  </Collapse>
                )}
              </Box>
            )}
            {selectedManager && (
              <>
                <Box mt={2}>
                  <Box mb={1} mt={2}>
                    Selected:
                  </Box>
                  <Container m={1} className={classes.selectedContainer}>
                    {selectedManager.profile.firstName}{" "}
                    {selectedManager.profile.lastName} |{" "}
                    {selectedManager.profile.location} |{" "}
                    {selectedManager.profile.jobTitle}
                  </Container>
                </Box>
                <Box mt={1}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => clearSelectedManager()}
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

export default ManagerSelect;
