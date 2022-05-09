import React, {memo, useCallback, useContext} from "react";
import {Box, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {OffboardEmployeeContext} from "../OffboardEmployeeContextProvider";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import SelectOffboardEmployee from "./SelectOffboardEmployee";
import TaskScheduling from "./TaskScheduling";
import HrInformation from "./HrInformation";
import DataTransfer from "./DataTransfer";
import LicenseRemoval from "./LicenseRemoval";
import DeviceUnassignment from "./DeviceUnassignment";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import TopTypography from "../../../components/typographies/TopTypography";
import RequestFormGridContainer from "../../../components/requestFormWrapper/RequestFormGridContainer";
import RequestFormTypography from "../../../components/typographies/RequestFormTypography";
import {getTaskStatusText} from "../../../data/constants/TaskStatuses";
import {connect} from "react-redux";
import {setSelectedOffboardUser} from "../../../data/redux/offboardRequest/offboardRequestActions";

const useStyles = makeStyles((theme) => ({
  boxRoot: {
    height: (props) => (props.small ? "300px" : "65vh"),
    overflow: "auto",
  },
  alertDiv: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CreateRequestForm = ({selectedOffboardUser, setSelectedOffboardUser}) => {
  const {permOffboardingHrInfo} = useContext(AuthUserContext);
  const {
    setSelectedTransferUser,
    isOffboarding,
    offboardingReason,
    setIsOffboarding,
    setOffboardingReason,
    setIsBtnDisabled,
    setTaskScheduleEpoch,
    isSelectedLoading,
  } = useContext(OffboardEmployeeContext);
  const classes = useStyles({small: !selectedOffboardUser});

  const clearSelectedOffboardUser = useCallback(() => {
    setSelectedOffboardUser("");
    setSelectedTransferUser("");
    setIsOffboarding("");
    setOffboardingReason("");
    setIsBtnDisabled(false);
    setTaskScheduleEpoch(null);
  }, [
    setSelectedOffboardUser,
    setSelectedTransferUser,
    setIsOffboarding,
    setOffboardingReason,
    setIsBtnDisabled,
    setTaskScheduleEpoch,
  ]);

  return (
    <Box className={classes.boxRoot}>
      <PaperCardWrapper>
        {selectedOffboardUser && (
          <>
            {isOffboarding && (
              <div className={classes.alertDiv}>
                <Alert severity="error" onClose={clearSelectedOffboardUser}>
                  {selectedOffboardUser.profile.firstName}{" "}
                  {selectedOffboardUser.profile.lastName} has an offboarding
                  task that is{" "}
                  {getTaskStatusText(offboardingReason).toLocaleLowerCase()}.
                </Alert>
              </div>
            )}
          </>
        )}
        <Box>
          <TopTypography>Create Offboarding Request</TopTypography>
          <Typography component={"div"} variant="subtitle2">
            All fields marked with * are required.
          </Typography>
        </Box>

        <RequestFormGridContainer>
          <Grid item container>
            <Grid item xs={12}>
              <Typography component={"div"}>
                <Box fontWeight={600}>Employee Details</Box>
              </Typography>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={4}>
              <RequestFormTypography title="Search &amp; select employee to offboard" />
            </Grid>
            <Grid item xs={8}>
              <SelectOffboardEmployee />
            </Grid>
          </Grid>
        </RequestFormGridContainer>

        {selectedOffboardUser && (
          <>
            {!isOffboarding && !isSelectedLoading && (
              <>
                <Divider />
                <RequestFormGridContainer>
                  <DataTransfer />
                </RequestFormGridContainer>

                <Divider />
                <RequestFormGridContainer>
                  <LicenseRemoval />
                </RequestFormGridContainer>

                <Divider />
                <RequestFormGridContainer>
                  <DeviceUnassignment />
                </RequestFormGridContainer>

                <Divider />
                <RequestFormGridContainer>
                  <TaskScheduling />
                </RequestFormGridContainer>

                {permOffboardingHrInfo && (
                  <>
                    <Divider />
                    <RequestFormGridContainer>
                      <HrInformation />
                    </RequestFormGridContainer>
                  </>
                )}
              </>
            )}
          </>
        )}
      </PaperCardWrapper>
    </Box>
  );
};

export default connect(
  (state) => ({
    selectedOffboardUser: state.offboardRequest.get("selectedOffboardUser"),
  }),
  {setSelectedOffboardUser}
)(memo(CreateRequestForm));
