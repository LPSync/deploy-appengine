import React, {memo} from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserImg from "../../../components/UserImg";
import BusinessIcon from "@material-ui/icons/Business";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import {SupervisedUserCircle} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  iconTextBox: {display: "flex", alignContent: "center"},
  icon: {fontSize: "1.25rem", marginRight: theme.spacing(1)},
  selectBtnBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  selectedContainer: {
    border: "1px solid " + theme.palette.warning.main,
    borderRadius: "5px",
    padding: theme.spacing(2),
  },
}));

const SelectedOffboardEmployee = ({userProfile, clearSelectedOffboardUser}) => {
  const classes = useStyles();

  return (
    <Box width={700}>
      {clearSelectedOffboardUser && (
        <Box className={classes.selectBtnBox} mb={1}>
          <Box>Selected Employee:</Box>
          <Box>
            <Button
              size="small"
              variant="contained"
              onClick={clearSelectedOffboardUser}
            >
              Clear Selected
            </Button>
          </Box>
        </Box>
      )}
      <Container className={classes.selectedContainer}>
        <Grid container>
          <Grid item>
            <UserImg medium email={userProfile?.email} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              {/*1*/}
              <Grid item xs>
                <Typography variant={"h6"}>
                  <strong>
                    {userProfile?.firstName} {userProfile?.lastName}
                  </strong>
                </Typography>
                <Typography variant={"subtitle1"} gutterBottom>
                  {userProfile?.jobTitle}
                </Typography>
              </Grid>
              {/*2*/}
              <Grid item container direction={"row"} spacing={10}>
                <Grid item>
                  <Box className={classes.iconTextBox} mb={1}>
                    <BusinessIcon className={classes.icon} />{" "}
                    {userProfile?.businessUnit}
                  </Box>
                  <Box className={classes.iconTextBox}>
                    <WorkOutlineIcon className={classes.icon} />{" "}
                    {userProfile?.department}
                  </Box>
                </Grid>
                <Grid item>
                  <Box className={classes.iconTextBox} mb={1}>
                    <LocationOnIcon className={classes.icon} />{" "}
                    {userProfile?.location}
                  </Box>
                  <Box className={classes.iconTextBox}>
                    <SupervisedUserCircle className={classes.icon} />{" "}
                    {userProfile?.manager}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {/*3*/}
            <Grid item>
              <FontAwesomeIcon icon="id-card" /> {userProfile?.employeeNumber}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default memo(SelectedOffboardEmployee);
