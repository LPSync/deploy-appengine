import React, {memo, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {
  Box,
  makeStyles,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Toolbar,
  Drawer,
  Button,
} from "@material-ui/core";
import TopTypography from "../../../../components/typographies/TopTypography";
import {NetworkStatus, useQuery} from "@apollo/client";
import handleError from "../../../../data/handleError";
import {GET_ALL_ONBOARDING_DELEGATES} from "../../../../operations/adminQueries/getAllOnboardingDelegates";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import StyledTableRow from "../../../../components/table/StyledTableRow";
import AddIcon from "@material-ui/icons/Add";
import AddDelegatesDrawer from "./AddDelegatesDrawer";
import EditDelegatesDrawer from "./EditDelegatesDrawer";
import DelegateChip from "../../../../components/chips/DelegateChip";
import EditButton from "../../../../components/buttons/EditButton";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "1000px",
  },
  chip: {
    fontSize: ".75rem",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.1rem",
  },
  tableBox: {overflow: "auto", height: "55vh", padding: theme.spacing(3)},
  paper: {
    width: "700px",
    display: "flex",
    flexDirection: "column",
  },
}));

const OnboardingDelegates = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [drawerView, setDrawerView] = useState();

  const {data, loading, networkStatus, refetch} = useQuery(
    GET_ALL_ONBOARDING_DELEGATES,
    {
      notifyOnNetworkStatusChange: true,
      onError: (error) => handleError(error)(history),
    }
  );

  useEffect(() => {
    if (loading || networkStatus === NetworkStatus.refetch) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading, networkStatus]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const handleEdit = (delegate) => {
    setSelected(delegate);
    setDrawerView("edit");
    setIsDrawerOpen(true);
  };

  const handleAdd = () => {
    setDrawerView("add");
    setIsDrawerOpen(true);
  };

  return (
    <Box className={classes.box}>
      <Toolbar>
        <div>
          <TopTypography>Onboarding Delegates</TopTypography>
        </div>
        <Box flexGrow={1} />
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleAdd}
        >
          <AddIcon className={classes.icon} /> Add New Delegate
        </Button>
      </Toolbar>

      {isLoading ? (
        <LoadingCircle />
      ) : (
        <>
          {data && (
            <Box className={classes.tableBox}>
              <TableContainer>
                <Table size="small" className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeadCell}>
                        Delegate User
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Delegate To and/or Company
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Edit
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.tableBody}>
                    {data?.get_all_onboarding_delegates.map((user) => (
                      <React.Fragment key={user.userName}>
                        <StyledTableRow
                          id={user}
                          key={user}
                          className={classes.tableRow}
                        >
                          <TableCell>{user.userName}</TableCell>
                          <TableCell>
                            {user.onboardingDelegates?.map((del) => (
                              <DelegateChip
                                key={del.id}
                                delegate={del}
                                className={classes.chip}
                              />
                            ))}
                          </TableCell>
                          <TableCell>
                            <EditButton onClick={() => handleEdit(user)} />
                          </TableCell>
                        </StyledTableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </>
      )}
      <div>
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          classes={{paper: classes.paper}}
        >
          {drawerView === "add" ? (
            <AddDelegatesDrawer
              refetch={refetch}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          ) : (
            <EditDelegatesDrawer
              refetch={refetch}
              setIsDrawerOpen={setIsDrawerOpen}
              selected={selected}
            />
          )}
          <div />
        </Drawer>
      </div>
    </Box>
  );
};

export default memo(OnboardingDelegates);
