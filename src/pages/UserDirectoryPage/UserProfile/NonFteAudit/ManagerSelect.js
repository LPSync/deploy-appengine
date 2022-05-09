import React, { useEffect, useState } from "react";
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
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USERS_QUERY } from "../../../../operations/queries/searchUsersQuery";
import handleError from "../../../../data/handleError";
import { useHistory } from "react-router-dom";
import NoResultsTypography from "../../../../components/typographies/NoResultsTypography";

const useStyles = makeStyles((theme) => ({
  box: { position: "relative" },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
  textField: {
    width: "40ch",
  },
  resultsBox: {
    position: "absolute",
    zIndex: 1,
    width: "40ch",
    border: "1px solid " + theme.palette.secondary.main,
    maxHeight: "10rem",
    overflow: "auto",
  },
  selectedContainer: {
    border: "1px solid " + theme.palette.warning.main,
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
}));

const ManagerSelect = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState();
  const [resultsOpen, setResultsOpen] = useState(false);

  const [executeSearch] = useLazyQuery(SEARCH_USERS_QUERY, {
    onCompleted: (data) => {
      setUsersData(data.search_users);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (searchQuery?.length > 0) {
      executeSearch({ variables: { search: searchQuery } });

      setResultsOpen(true);
    } else if (searchQuery?.length === 0) {
      setUsersData("");
      setResultsOpen(false);
    }
  }, [searchQuery, executeSearch]);

  const handleClick = (selected) => {
    props.setSelectedManager(
      `${selected.profile.firstName} ${selected.profile.lastName}`
    );
    props.setViewSubmitBtn(true);
    setSearchQuery("");
  };

  const clearSelectedManager = () => {
    props.setSelectedManager("");
  };

  return (
    <>
      {!props.selectedManager && (
        <Box mb={2} className={classes.box}>
          <TextField
            required
            label="Search &amp; select manager"
            variant="standard"
            helperText="Search by Name, Email, or HRIS ID"
            color="secondary"
            size="small"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={classes.textField}
          />

          {searchQuery?.length > 0 && (
            <Collapse in={resultsOpen} timeout="auto" unmountOnExit>
              {usersData && (
                <Box className={classes.resultsBox}>
                  <Paper>
                    {usersData?.length === 0 ? (
                      <Box m={1}>
                        <NoResultsTypography/>
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
                                      {user.profile.lastName}
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
              )}
            </Collapse>
          )}
        </Box>
      )}
      {props.selectedManager && (
        <>
          <Box mt={2}>
            <Box mb={1} mt={2}>
              Selected:
            </Box>
            <Container m={1} className={classes.selectedContainer}>
              {props.selectedManager}
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
  );
};

export default ManagerSelect;
