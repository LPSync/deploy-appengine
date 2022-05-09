import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import TopTypography from "../../../../components/typographies/TopTypography";
import SearchInput from "../../../../components/SearchInput";
import BoxTableWrapper from "../../../../components/table/BoxTableWrapper";
import React, {useEffect, useState} from "react";
import StyledTableRow from "../../../../components/table/StyledTableRow";
import {useHistory} from "react-router-dom";
import {useLazyQuery, useMutation} from "@apollo/client";
import handleError from "../../../../data/handleError";
import {SEARCH_USERS_FOR_SPLASH_SCREEN_SETTINGS} from "../../../../operations/queries/searchUsersByBadgesQuery";
import {UPDATE_SPLASH_SCREEN_COMPLETED} from "../../../../operations/mutations/updateSplashScreenCompleted";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "1000px",
  },
  toolbar: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  boxButtons: {
    marginTop: 24,
    marginBottom: 24,
  },
  boxButton: {
    marginRight: 24,
  },
  chip: {
    fontSize: ".75rem",
    margin: ".25rem",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.1rem",
  },
  tableBox: {overflow: "auto", height: "55vh", padding: theme.spacing(3)},
  tableContainer: {
    position: "relative",
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    backgroundColor: "rgba(255, 255,255,0.3)",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const headCells = ["Name", "Username", "Splash Screen Status", ""];

const SplashScreenSettings = () => {
  const classes = useStyles();
  let history = useHistory();
  const [oktaUsers, setOktaUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [getOktaUsers, {loading: loadingOktaUsers}] = useLazyQuery(
    SEARCH_USERS_FOR_SPLASH_SCREEN_SETTINGS,
    {
      onCompleted: (data) =>
        setOktaUsers(data.search_users_for_splash_screen_settings),
      onError: (error) => handleError(error)(history),
    }
  );
  const [updateSplashScreen, {loading: updatingSplashScreen}] = useMutation(
    UPDATE_SPLASH_SCREEN_COMPLETED,
    {
      // onCompleted: ({updateSplashScreenCompleted: users}) => {
      //   setOktaUsers((prevUsers) =>
      //     prevUsers.map((prevUser) => {
      //       const newUser = users.find((u) => u.id === prevUser.id);
      //       if (newUser) return newUser;
      //       else return prevUser;
      //     })
      //   );
      // },
      onError: (error) => handleError(error)(history),
    }
  );

  useEffect(() => {
    getOktaUsers({variables: {search: searchQuery}});
  }, [searchQuery]);

  const searchHandler = (query) => {
    setSearchQuery(query);
  };

  const resetHandler = () => {
    updateSplashScreen({
      variables: {
        type: "all",
        bool: false,
      },
    });
  };
  const turnOffHandler = () => {
    updateSplashScreen({
      variables: {
        type: "all",
        bool: true,
      },
    });
  };
  const toggleHandler = (userId) => {
    const user = oktaUsers.find((u) => u.id === userId);
    const bool = !user?.splashScreenCompleted;
    updateSplashScreen({
      variables: {
        id: userId,
        type: "single",
        bool,
      },
    });
  };

  return (
    <Box className={classes.box}>
      <Toolbar className={classes.toolbar}>
        <div>
          <TopTypography>Splash Screen Settings for ALL Users</TopTypography>
        </div>
        <Box flexGrow={1} />
        <Box className={classes.boxButtons}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={resetHandler}
            className={classes.boxButton}
          >
            Reset Splashscreen
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={turnOffHandler}
            className={classes.boxButton}
          >
            Turn off Splashscreen
          </Button>
        </Box>
        <div>
          <TopTypography>Splash Screen Settings per User</TopTypography>
        </div>
      </Toolbar>
      <Box mt={1}>
        <SearchInput
          onSearch={searchHandler}
          searchQuery={searchQuery}
          label={"Search"}
          helperText={"Search for name, username or splashscreen status"}
        />
      </Box>
      <div className={classes.tableContainer}>
        {updatingSplashScreen && (
          <div className={classes.loader}>
            <CircularProgress color="secondary" />
          </div>
        )}
        <BoxTableWrapper
          id={"manage-splash-screen-settings-table"}
          loading={loadingOktaUsers}
          dataLength={oktaUsers?.length}
          hasMore={false}
          minHeight="325px"
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                {headCells.map((cell, id) => (
                  <TableCell key={id}>{cell}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {oktaUsers?.map((user) => (
                <React.Fragment key={user?.id}>
                  <StyledTableRow id={user?.id} key={user?.id}>
                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.splashScreenCompleted ? 1 : 0}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => toggleHandler(user.id)}
                      >
                        {!user.splashScreenCompleted ? "Disable" : "Enable"}
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </BoxTableWrapper>
      </div>
    </Box>
  );
};
export default SplashScreenSettings;
