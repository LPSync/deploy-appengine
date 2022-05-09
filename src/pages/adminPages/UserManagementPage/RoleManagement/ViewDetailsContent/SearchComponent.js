import React, {memo, useState} from "react";
import clsx from "clsx";
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
import SelectCircularProgress from "../../../../../components/circularProgress/SelectCircularProgress";
import NoResultsTypography from "../../../../../components/typographies/NoResultsTypography";
import {useLazyQuery} from "@apollo/client";
import handleError from "../../../../../data/handleError";
import {useHistory} from "react-router-dom";
import {SEARCH_USERS_QUERY} from "../../../../../operations/queries/searchUsersQuery";
import {DebounceInput} from "react-debounce-input";

const useStyles = makeStyles((theme) => ({
  box: {position: "relative", flexGrow: 1},
  selected: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
    height: 76,
  },
  textField: {
    minWidth: "40ch",
    width: "100%",
  },
  resultsBox: {
    position: "absolute",
    zIndex: 2,
    minWidth: "40ch",
    width: "100%",
    border: "1px solid " + theme.palette.secondary.main,
    maxHeight: "15rem",
    overflow: "auto",
  },
  selectedContainer: {
    border: "1px solid " + theme.palette.warning.main,
    padding: "5px 10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressBar: {
    background: "" + theme.palette.warning.main,
  },
}));

const SearchComponent = ({selected, setSelected}) => {
  const debounceTime = 500;
  const history = useHistory();
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState();
  const [resultsOpen, setResultsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);

  const [executeSearch, {loading: isResultsLoading}] = useLazyQuery(
    SEARCH_USERS_QUERY,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) =>
        setList(data?.search_users.map((item) => item.profile)),
      onError: (error) => handleError(error)(history),
    }
  );

  const handleClick = (item) => {
    setSelected(item);
    setSearchQuery(`${item.firstName} ${item.lastName}`);
    setResultsOpen(false);
    setSelectedValue(true);
  };

  const clearSelectedValue = () => {
    setSelectedValue(false);
    setSelected(null);
    setSearchQuery("");
  };

  const searchOnChange = (e) => {
    if (e.target.value === "") {
      setResultsOpen(false);
      return;
    }
    setResultsOpen(true);
    setSearchQuery(e.target.value);
    executeSearch({variables: {search: e.target.value}});
  };
  const blurHandler = (e) => {
    if (e?.relatedTarget?.classList?.contains("prevent-blur")) return;
    setResultsOpen(false);
    if (!selected) {
      setSearchQuery("");
      setSelectedValue(false);
    }
  };
  return (
    <>
      {!selectedValue && (
        <Box className={clsx(classes.box)}>
          <DebounceInput
            className={classes.textField}
            id="standard-basic"
            label="Search"
            color="secondary"
            variant="standard"
            debounceTimeout={debounceTime}
            value={searchQuery}
            helperText="Search by Name | Email | UserName"
            onChange={searchOnChange}
            element={TextField}
            onBlur={blurHandler}
            autoComplete="off"
          />

          {searchQuery?.length > 0 && (
            <Collapse in={resultsOpen} timeout="auto" unmountOnExit>
              <Box className={classes.resultsBox}>
                <Paper>
                  {isResultsLoading && <SelectCircularProgress />}
                  {list && !isResultsLoading && (
                    <>
                      {list?.length === 0 ? (
                        <Box m={1}>
                          <NoResultsTypography />
                        </Box>
                      ) : (
                        <List>
                          {list.map((item, index) => (
                            <React.Fragment key={index}>
                              <ListItem
                                key={index}
                                button
                                onClick={() => handleClick(item)}
                                className="prevent-blur"
                              >
                                <ListItemText
                                  primary={
                                    <>
                                      <Typography
                                        component={"div"}
                                        variant="subtitle1"
                                      >
                                        {`${item.firstName} ${item.lastName} | ${item.email} | ${item.userName}`}
                                      </Typography>
                                    </>
                                  }
                                />
                              </ListItem>
                              {list?.length > 1 && <Divider />}
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

      {selectedValue && (
        <>
          <Box className={classes.selected}>
            <Container m={1} className={classes.selectedContainer}>
              {`${selected.firstName} ${selected.lastName}`}
            </Container>
            <Button
              size="small"
              variant="contained"
              onClick={clearSelectedValue}
              style={{width: 200, marginLeft: 8}}
            >
              Clear&nbsp;Selected
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default memo(SearchComponent);
