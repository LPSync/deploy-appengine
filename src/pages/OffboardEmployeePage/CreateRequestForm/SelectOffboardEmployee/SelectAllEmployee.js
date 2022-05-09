import React, {memo, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
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
} from "../../../../operations/queries/searchUsersQuery";
import {OffboardEmployeeContext} from "../../OffboardEmployeeContextProvider";
import handleError from "../../../../data/handleError";
import SelectCircularProgress from "../../../../components/circularProgress/SelectCircularProgress";
import NoResultsTypography from "../../../../components/typographies/NoResultsTypography";
import {setSelectedOffboardUser} from "../../../../data/redux/offboardRequest/offboardRequestActions";

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

const SelectAllEmployee = ({
  selectedOffboardUser,
  setSelectedOffboardUser,
  type,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const {
    setIsOffboarding,
    setOffboardingReason,
    setIsBtnDisabled,
    setIsSelectedLoading,
  } = useContext(OffboardEmployeeContext);
  const [searchQuery, setSearchQuery] = useState("");
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

  const clearFields = () => {
    setSelectedOffboardUser("");
    setIsOffboarding(false);
    setOffboardingReason("");
    setIsBtnDisabled(false);
  };

  useEffect(() => {
    if (searchQuery?.length) {
      executeSearch({variables: {search: searchQuery}});
      clearFields();
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

  const searchOnChange = (e) => {
    setIsResultsLoading(true);
    setResultsOpen(true);
    setSearchQuery(e.target.value);
  };

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
            value={searchQuery}
            onChange={(e) => searchOnChange(e)}
            className={classes.textField}
          />

          {searchQuery?.length > 0 && (
            <Collapse in={resultsOpen} timeout="auto" unmountOnExit>
              <Box className={classes.resultsBox}>
                <Paper>
                  {isResultsLoading && <SelectCircularProgress />}
                  {!usersData?.length ? (
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

export default connect(
  (state) => ({
    selectedOffboardUser: state.offboardRequest.get("selectedOffboardUser"),
  }),
  {setSelectedOffboardUser}
)(memo(SelectAllEmployee));
