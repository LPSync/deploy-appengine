import React, {memo, useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  Box,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import UserDirectorySearchTypes from "../../../data/constants/UserDirectorySearchTypes";
import SelectCircularProgress from "../../../components/circularProgress/SelectCircularProgress";
import NoResultsTypography from "../../../components/typographies/NoResultsTypography";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import {useLazyQuery} from "@apollo/client";
import {SEARCH_USER_DIRECTORY} from "../../../operations/queries/searchUserDirectory";
import handleError from "../../../data/handleError";
import {
  setDisabledSearchResults,
  setSearchQuery,
  setSearchType,
  setUsersData,
} from "../../../data/redux/userDirectory/userDirectoryActions";
import SearchBlock from "../../../components/blocks/SearchBlock";
import useDebouncedChangeHandler from "../../../hooks/useDebouncedChangeHandler";

const useStyles = makeStyles((theme) => ({
  headerBox: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
  },
  resultsBox: {
    position: "absolute",
    zIndex: 1,
    width: "50ch",
    border: "1px solid " + theme.palette.secondary.main,
    maxHeight: "20rem",
    overflow: "auto",
  },
}));

const UserProfileSearch = ({
  searchQuery,
  setSearchQuery,
  usersData,
  setUsersData,
  searchType,
  setSearchType,
  disabledSearchResults,
  setDisabledSearchResults,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [resultsOpen, setResultsOpen] = useState(false);
  const location = useLocation()?.pathname;

  useEffect(() => {
    setDisabledSearchResults(true);
  }, [location]);

  const [executeUserDirSearch, {loading: isResultsLoading}] = useLazyQuery(
    SEARCH_USER_DIRECTORY,
    {
      onCompleted: (data) => {
        setUsersData(data.search_user_directory);
      },
      onError: (error) => handleError(error)(history),
    }
  );

  const handleClick = (userEmail) => {
    let username;

    const splitEmail = userEmail.split("@");
    if (splitEmail[1] === "liveperson.com") {
      username = splitEmail[0];
    } else {
      username = userEmail;
    }
    history.push(FrontendRoutes.USER_DIRECTORY_PROFILE(username));
  };

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (searchQuery?.length) {
      executeUserDirSearch({
        variables: {search: {query: searchQuery, type: searchType}},
      });
      setResultsOpen(true);
    } else if (searchQuery?.length === 0) {
      setResultsOpen(false);
      setUsersData("");
    }
  }, [searchQuery, searchType, setUsersData, executeUserDirSearch]);

  const debouncedChangeHandler = useDebouncedChangeHandler(setSearchQuery);

  return (
    <Box my={3} className={classes.headerBox}>
      <Box>
        <SearchBlock
          searchQuery={searchQuery}
          handleChange={debouncedChangeHandler}
          searchProps={{
            id: "employee-search-text-field",
            label: "User Directory Search",
            helperText: "Search by Name, Email, Job Title, Department, Location, Badges, Cost Center, or HRIS ID",
            onClick: () => disabledSearchResults && setDisabledSearchResults(false),
            onBlur: () => !disabledSearchResults && setDisabledSearchResults(true),
          }}
          searchType={searchType}
          setSearchType={setSearchType}
          types={UserDirectorySearchTypes}
        />
        {!disabledSearchResults && searchQuery?.length > 0 && (
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
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleClick(user.profile.email)}
                            >
                              <ListItemText
                                primary={
                                  <Typography
                                    component={"div"}
                                    variant="subtitle1"
                                  >
                                    {user.profile.firstName}{" "}
                                    {user.profile.lastName} |{" "}
                                    {user.profile.location} |{" "}
                                    {user.profile.jobTitle}
                                  </Typography>
                                }
                              />
                            </ListItem>
                            {usersData?.length > 1 && <Divider />}
                          </React.Fragment>
                        ))}
                      </List>
                    )}{" "}
                  </>
                )}
              </Paper>
            </Box>
          </Collapse>
        )}
      </Box>

      <Box>
        <Button variant="outlined" color="secondary" onClick={handleBack}>
          <ArrowBackIosIcon /> Back
        </Button>
      </Box>
    </Box>
  );
};

export default connect(
  (state) => ({
    searchQuery: state.userDirectory.get("searchQuery"),
    searchType: state.userDirectory.get("searchType"),
    usersData: state.userDirectory.get("usersData"),
    disabledSearchResults: state.userDirectory.get("disabledSearchResults"),
  }),
  {
    setSearchQuery,
    setSearchType,
    setUsersData,
    setDisabledSearchResults,
  }
)(memo(UserProfileSearch));
