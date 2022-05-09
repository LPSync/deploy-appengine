import React, {memo, useContext, useEffect, useState} from "react";
import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {useLazyQuery} from "@apollo/client";
import {SEARCH_USERS_QUERY} from "../../../operations/queries/searchUsersQuery";
import {OffboardEmployeeContext} from "../OffboardEmployeeContextProvider";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";
import SelectCircularProgress from "../../../components/circularProgress/SelectCircularProgress";
import NoResultsTypography from "../../../components/typographies/NoResultsTypography";

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
    border: "1px solid " + theme.palette.warning.main,
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
}));

const SelectTransferEmployee = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    selectedTransferUser,
    setSelectedTransferUser,
    transferUserError,
    setTransferUserError,
  } = useContext(OffboardEmployeeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState();
  const [resultsOpen, setResultsOpen] = useState(false);
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  const [executeSearch, {error}] = useLazyQuery(SEARCH_USERS_QUERY, {
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
      setUsersData("");
      setResultsOpen(false);
    }
  }, [searchQuery, executeSearch]);

  const handleClick = (selected) => {
    setSelectedTransferUser(selected);
    setTransferUserError(false);
    setSearchQuery("");
  };

  const handleClear = () => {
    setSelectedTransferUser("");
  };

  const searchOnChange = (e) => {
    setIsResultsLoading(true);
    setResultsOpen(true);
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {!selectedTransferUser && (
        <>
          <Box>
            <Typography component={"div"} variant="subtitle2">
              If transfer user is not selected, default will be
              "livepersondrive@liveperson.com"
            </Typography>
          </Box>
          <Box my={2} className={classes.box}>
            <TextField
              label="Search"
              variant="standard"
              helperText="Search by Name, Email, or HRIS ID"
              color="secondary"
              size="small"
              autoComplete="off"
              error={transferUserError}
              value={searchQuery}
              onChange={(e) => searchOnChange(e)}
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
        </>
      )}
      {selectedTransferUser && (
        <>
          <Box mt={2}>
            <Box mb={1} mt={2}>
              {selectedTransferUser.profile.email ===
              "livepersondrive@liveperson.com"
                ? "Default:"
                : "Selected:"}
            </Box>
            <Container m={1} className={classes.selectedContainer}>
              {selectedTransferUser.profile.email ===
              "livepersondrive@liveperson.com" ? (
                "livepersondrive@liveperson.com"
              ) : (
                <>
                  {" "}
                  {selectedTransferUser.profile.firstName}{" "}
                  {selectedTransferUser.profile.lastName} |{" "}
                  {selectedTransferUser.profile.location} |{" "}
                  {selectedTransferUser.profile.jobTitle}{" "}
                </>
              )}
            </Container>
          </Box>
          <Box mt={1} mb={2}>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleClear()}
            >
              Clear Selected
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default memo(SelectTransferEmployee);
