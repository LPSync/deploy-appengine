import React, { memo, useEffect } from "react";
import {useLazyQuery} from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {GET_APPS_LIST} from "../../../../../operations/queries/getAppsList";
import StyledTableRow from "../../../../../components/table/StyledTableRow";
import handleError from "../../../../../data/handleError";
import {useHistory} from "react-router-dom";
import { connect } from "react-redux";
import { setIsAppMembershipsDrawerOpen } from "../../../../../data/redux/userDirectory/userDirectoryActions";

const useStyles = makeStyles(() => ({
  paper: {
    width: "600px",
    display: "flex",
    flexDirection: "column",
  },
  closeToolbar: {flexShrink: 0},
  footerDiv: {height: "3rem", flexShrink: 0},
  btnDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  titleBox: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  box: {overflowY: "auto"},
  table: {
    maxWidth: "100%",
    maxHeight: "95%",
  },
  tableHeadCell: {
    background: "#16173f",
  },
  tableHeadText: {
    fontWeight: 600,
  },
  tableCell: {
    borderBottom: "none",
  },
}));

const AppMembershipsDrawer = ({userData, isAppMembershipsDrawerOpen, setIsAppMembershipsDrawerOpen}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {}, [isAppMembershipsDrawerOpen]);

  const [executeSearch, {data}] = useLazyQuery(GET_APPS_LIST, {
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (userData) {
      executeSearch({variables: {search: userData?.id}});
    }
  }, [userData, executeSearch]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsAppMembershipsDrawerOpen(open);
  };

  const handleClose = () => {
    setIsAppMembershipsDrawerOpen(false);
  };

  return (
    <div className={classes.drawerRoot}>
      <Drawer
        anchor="right"
        open={isAppMembershipsDrawerOpen}
        onClose={toggleDrawer(false)}
        classes={{paper: classes.paper}}
      >
        <Toolbar className={classes.closeToolbar}>
          <Box className={classes.btnDiv}>
            <Button variant="outlined" size="small" onClick={handleClose}>
              <CloseIcon /> Close
            </Button>
          </Box>
        </Toolbar>

        <Toolbar>
          <Box className={classes.titleBox}>
            <div>
              <Typography component={"div"} className={classes.tableHeadText}>
                List of Application Memberships
              </Typography>
            </div>
            <div> Total: {data?.get_apps_list[0]?.totalCount}</div>
          </Box>
        </Toolbar>
        <Divider />
        {data?.get_apps_list[0]?.totalCount > 0 && (
          <Box mt={2} className={classes.box}>
            <Container>
              <TableContainer className={classes.table}>
                <Table
                  stickyHeader={true}
                  size="small"
                  aria-label="application-memberships-table"
                >
                  <TableBody className={classes.tableBody}>
                    {data?.get_apps_list?.map((app) => (
                      <StyledTableRow key={app.id}>
                        <TableCell align="left" className={classes.tableCell}>
                          {app.label}
                        </TableCell>
                        <TableCell className={classes.tableCell} />
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Box>
        )}
        <div className={classes.footerDiv} />
      </Drawer>
    </div>
  );
};

export default connect(
  state => ({
    userData: state.userDirectory.get("userData"),
    isAppMembershipsDrawerOpen: state.userDirectory.get("isAppMembershipsDrawerOpen"),
  }),
  {setIsAppMembershipsDrawerOpen})
(memo(AppMembershipsDrawer));
