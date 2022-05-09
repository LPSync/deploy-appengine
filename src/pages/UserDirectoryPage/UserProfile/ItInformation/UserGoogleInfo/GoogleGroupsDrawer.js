import React, {memo, useEffect} from "react";
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
import {GET_GOOGLE_USER_GROUPS} from "../../../../../operations/queries/getGoogleUserGroups";
import handleError from "../../../../../data/handleError";
import {useHistory} from "react-router-dom";
import StyledTableRow from "../../../../../components/table/StyledTableRow";
import { connect } from "react-redux";
import { setIsGoogleGroupsDrawerOpen } from "../../../../../data/redux/userDirectory/userDirectoryActions";

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
  tableHeadText: {
    fontWeight: 600,
  },
  tableCell: {
    borderBottom: "none",
  },
}));

const GoogleGroupsDrawer = ({userData, isGoogleGroupsDrawerOpen, setIsGoogleGroupsDrawerOpen}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {}, [isGoogleGroupsDrawerOpen]);

  const [executeSearch, {data}] = useLazyQuery(GET_GOOGLE_USER_GROUPS, {
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (userData) {
      executeSearch({variables: {search: userData?.profile?.email}});
    }
  }, [userData, executeSearch]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsGoogleGroupsDrawerOpen(open);
  };

  const handleClose = () => {
    setIsGoogleGroupsDrawerOpen(false);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={isGoogleGroupsDrawerOpen}
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

        <>
          <Toolbar>
            <Box className={classes.titleBox}>
              <div>
                <Typography component={"div"} className={classes.tableHeadText}>
                  List of Google Groups
                </Typography>
              </div>
              <div> Total: {data?.get_google_user_groups[0]?.totalCount}</div>
            </Box>
          </Toolbar>
          <Divider />
          {data?.get_google_user_groups[0]?.totalCount > 0 && (
            <Box mt={2} className={classes.box}>
              <Container>
                <TableContainer className={classes.table}>
                  <Table
                    size="small"
                    aria-label="application-memberships-table"
                  >
                    <TableBody>
                      {data?.get_google_user_groups?.map((group) => (
                        <StyledTableRow key={group.id}>
                          <TableCell align="left" className={classes.tableCell}>
                            <Typography component={"div"} variant="body2">
                              {group.name}
                            </Typography>
                            <Typography component={"div"} variant="subtitle2">
                              {group.email}
                            </Typography>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </Box>
          )}
        </>

        <div className={classes.footerDiv} />
      </Drawer>
    </div>
  );
};

export default connect(
  state => ({
    userData: state.userDirectory.get("userData"),
    isGoogleGroupsDrawerOpen: state.userDirectory.get("isGoogleGroupsDrawerOpen"),
  }),
  {setIsGoogleGroupsDrawerOpen}
)
(memo(GoogleGroupsDrawer));
