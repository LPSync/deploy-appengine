import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { CREATE_REPORTING_NONFTE_AUDIT } from "../../../../operations/mutations/createReportingNonFteAudit";
import ManagerSelect from "./ManagerSelect";
import { connect } from "react-redux";
import { setIsAuditDrawerOpen, setSelectedAuditUser } from "../../../../data/redux/userDirectory/userDirectoryActions";
import FrontendRoutes from "../../../../data/constants/FrontendRoutes";
import StyledDrawer from "../../../../components/drawers/StyledDrawer";
import TaskContainerTable from "../../../../components/taskManager/TaskContainerTable";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "35ch",
  },
  tableCellKey: {
    borderBottom: "none",
    fontSize: ".9rem",
  },
  tableCell: {
    fontWeight: 700,
    borderBottom: "none",
    fontSize: ".9rem",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const AuditStatuses = [
  {value: "Not audited", label: "Not Audited"},
  {value: "Reports to me - no change"},
  {value: "Not reporting to me - manager known"},
  {value: "Not reporting to me - manager unknown"},
  {value: "User is a full time employee"},
  {value: "User needs to be offboarded"},
]

const UpdateAuditDrawer = ({ selectedAuditUser, setSelectedAuditUser, isAuditDrawerOpen, setIsAuditDrawerOpen, runSearch }) => {
  const classes = useStyles();
  const [auditStatus, setAuditStatus] = useState("Not audited");
  const [viewSubmitBtn, setViewSubmitBtn] = useState(false);
  const [viewManagerSelect, setViewManagerSelect] = useState(false);
  const [selectedManager, setSelectedManager] = useState("");
  const [viewOffboardBtn, setViewOffboardBtn] = useState(false);

  const [createReportingNonFteAudit] = useMutation(
    CREATE_REPORTING_NONFTE_AUDIT,
    {
      onCompleted: () => setViewOffboardBtn(true),
    }
  );

  const createAuditReport = () => {
    createReportingNonFteAudit({
      variables: {
        input: {
          auditUserFirstName: selectedAuditUser.profile.firstName,
          auditUserLastName: selectedAuditUser.profile.lastName,
          auditUserEmail: selectedAuditUser.profile.email,
          auditUserStatus: auditStatus,
          auditUserInformation: selectedManager,
          auditCompleted: false,
        },
      },
    });
  };

  const handleSubmit = () => {
    createAuditReport();
    if (auditStatus !== "User needs to be offboarded") {
      setIsAuditDrawerOpen(false);
    }
    runSearch();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsAuditDrawerOpen(open);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setAuditStatus(value);
    if (value === "Not reporting to me - manager known") {
      setViewManagerSelect(true);
      setViewSubmitBtn(false);
    } else if (value === "Not audited") {
      setViewManagerSelect(false);
      setSelectedManager("");
      setViewSubmitBtn(false);
    } else {
      setViewManagerSelect(false);
      setSelectedManager("");
      setViewSubmitBtn(true);
    }
  };

  const handleClose = () => {
    setIsAuditDrawerOpen(false);
    setViewManagerSelect(false);
    setSelectedManager("");
    setViewSubmitBtn(false);
    setSelectedAuditUser();
  };

  return (
    <StyledDrawer
        isOpen={isAuditDrawerOpen}
        handleDrawerClose={toggleDrawer(false)}
        handleClose={handleClose}
      >
        {selectedAuditUser && (
          <Container>
            <Typography component={"div"}>
              Update Audit Status
            </Typography>
            <TaskContainerTable>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableCellKey}
                >
                  Name
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  {selectedAuditUser.profile.firstName}{" "}
                  {selectedAuditUser.profile.lastName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableCellKey}
                >
                  Email
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  {selectedAuditUser.profile.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableCellKey}
                >
                  Employee Type
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  {selectedAuditUser.profile.employeeType}
                </TableCell>
              </TableRow>
            </TaskContainerTable>

            <Divider className={classes.divider} />

            {!viewOffboardBtn && (
              <Grid container spacing={3}>
                <Grid item container>
                  <Grid item xs={4}>
                    <Typography component={"div"} variant="subtitle1">
                      Select audit status
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl variant="filled">
                      <InputLabel id="audit-status-select-label">
                        Audit Status
                      </InputLabel>
                      <Select
                        size="small"
                        labelId="audit-status-select-label"
                        id="audit-status-select"
                        value={auditStatus}
                        onChange={handleChange}
                        className={classes.select}
                      >
                        {AuditStatuses?.map(status => (
                          <MenuItem
                            key={status.value}
                            value={status.value}
                          >
                            {status?.label || status?.value}
                          </MenuItem>))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                {viewManagerSelect && (
                  <Grid item container>
                    <Grid item xs={4}>
                      <Typography component={"div"} variant="subtitle1">
                        Search &amp; select manager
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <ManagerSelect
                        selectedManager={selectedManager}
                        setSelectedManager={setSelectedManager}
                        setViewSubmitBtn={setViewSubmitBtn}
                      />
                    </Grid>
                  </Grid>
                )}
                <Grid item container>
                  <Grid item xs={8}>
                    <Typography component={"div"} variant="subtitle1">
                      {auditStatus === "User needs to be offboarded" &&
                        "You can offboard user after you submit"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    {viewSubmitBtn && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                      >
                        Submit Audit Update
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            )}
            {viewOffboardBtn && (
              <Box>
                <Button
                  component={Link}
                  to={FrontendRoutes.OFFBOARD_EMPLOYEE}
                  variant="contained"
                >
                  Offboard User
                </Button>
              </Box>
            )}
          </Container>
        )}
      </StyledDrawer>
  );
};

export default connect(
  state => ({
    selectedAuditUser: state.userDirectory.get("selectedAuditUser"),
    isAuditDrawerOpen: state.userDirectory.get("isAuditDrawerOpen")
  }),
  {setSelectedAuditUser, setIsAuditDrawerOpen})
(memo(UpdateAuditDrawer));
