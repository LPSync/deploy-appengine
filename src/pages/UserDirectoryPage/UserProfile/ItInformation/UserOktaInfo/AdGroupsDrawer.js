import React, { memo, useEffect } from "react";
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
import StyledTableRow from "../../../../../components/table/StyledTableRow";
import { connect } from "react-redux";
import { setIsAdGroupsDrawerOpen } from "../../../../../data/redux/userDirectory/userDirectoryActions";

const useStyles = makeStyles(() => ({
  paper: {
    width: "600px",
    display: "flex",
    flexDirection: "column",
  },
  closeToolbar: { flexShrink: 0 },
  footerDiv: { height: "3rem", flexShrink: 0 },

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
  box: { overflowY: "auto" },
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

const AdGroupsDrawer = ({ userData, isAdGroupsDrawerOpen, setIsAdGroupsDrawerOpen}) => {
  const classes = useStyles();

  useEffect(() => {}, [isAdGroupsDrawerOpen]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsAdGroupsDrawerOpen(open);
  };

  const handleClose = () => {
    setIsAdGroupsDrawerOpen(false);
  };

  return (
    <div className={classes.drawerRoot}>
      <Drawer
        anchor="right"
        open={isAdGroupsDrawerOpen}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.paper }}
      >
        <Toolbar className={classes.closeToolbar}>
          <Box className={classes.btnDiv}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon /> Close
            </Button>
          </Box>
        </Toolbar>
        <Toolbar>
          <Box className={classes.titleBox}>
            <div>
              <Typography component={'div'} className={classes.tableHeadText}>
                List of AD Group Memberships
              </Typography>
            </div>
            <div> Total: {userData?.totalCount}</div>
          </Box>
        </Toolbar>
        <Divider />
        <Box mt={2} className={classes.box}>
          <Container>
            <TableContainer className={classes.table}>
              <Table
                stickyHeader={true}
                size="small"
                aria-label="ad-group-memberships-table"
              >
                <TableBody>
                  {userData?.profile?.memberOf?.map((group) => (
                    <StyledTableRow key={group}>
                      <TableCell align="left" className={classes.tableCell}>
                        {group}
                      </TableCell>
                      <TableCell className={classes.tableCell}/>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
        <div className={classes.footerDiv}/>
      </Drawer>
    </div>
  );
};

export default connect(
  state => ({
    userData: state.userDirectory.get("userData"),
    isAdGroupsDrawerOpen: state.userDirectory.get("isAdGroupsDrawerOpen")
  }),
  {setIsAdGroupsDrawerOpen})
(memo(AdGroupsDrawer));
