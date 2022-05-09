import React, {memo, useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {Box, Grid, makeStyles} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import AllEmployeeSelect from "../../../components/formBlocks/offboardWhoDetails/AllEmployeeSelect";
import TeamEmployeeSelect from "../../../components/formBlocks/offboardWhoDetails/TeamEmployeeSelect";
import SelectedOffboardUser from "./SelectedOffboardEmployee";
import {SEARCH_USER_OFFBOARDING_TASK} from "../../../operations/queries/searchUserOffboardingTask";
import handleError from "../../../data/handleError";
import {
  setIsButtonDisabled,
  setIsOffboarding,
  setIsSelectedLoading,
  setOffboardingReason,
  setSelectedOffboardUser,
} from "../../../data/redux/offboardRequest/offboardRequestActions";
import {connect} from "react-redux";
import AlertBox from "../../../components/AlertBox";
import {getTaskStatusText} from "../../../data/constants/TaskStatuses";
import RequestFormTypography from "../../../components/typographies/RequestFormTypography";

const mapStateToProps = (state) => ({
  selectedOffboardUser: state.offboardRequest.getIn([
    "offboardDetails",
    "selectedOffboardUser",
  ]),
  isSelectedLoading: state.offboardRequest.get("isSelectedLoading"),
  isOffboarding: state.offboardRequest.get("isOffboarding"),
  offboardingReason: state.offboardRequest.get("offboardingReason"),
});

const mapDispatchToProps = {
  setSelectedOffboardUser,
  setIsSelectedLoading,
  setIsOffboarding,
  setIsButtonDisabled,
  setOffboardingReason,
};

const useStyles = makeStyles((theme) => ({
  progressBar: {
    background: "" + theme.palette.warning.main,
  },
}));

const OffboardEmployeeSelect = ({
  selectedOffboardUser,
  setSelectedOffboardUser,
  isSelectedLoading,
  isOffboarding,
  offboardingReason,
  setIsSelectedLoading,
  setIsOffboarding,
  setIsButtonDisabled,
  setOffboardingReason,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const {permOffboardingAll, permOffboardingTeam, permOffboardingNfte} =
    useContext(AuthUserContext);

  const clearSelectedOffboardUser = () => {
    setIsSelectedLoading(false);
    setSelectedOffboardUser("");
    setIsOffboarding(false);
    setOffboardingReason("");
    setIsButtonDisabled(false);
  };

  const [executeSearchOffboardingTask] = useLazyQuery(
    SEARCH_USER_OFFBOARDING_TASK,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) =>
        checkOffboardTask(data.search_user_offboarding_task),
      onError: (error) => handleError(error)(history),
    }
  );

  useEffect(() => {
    if (isSelectedLoading) {
      executeSearchOffboardingTask({
        variables: {search: selectedOffboardUser?.profile?.email},
      });
    }
  }, [isSelectedLoading, selectedOffboardUser]);

  const checkOffboardTask = (data) => {
    if (data.length > 0) {
      setIsOffboarding(true);
      setIsButtonDisabled(true);
      setOffboardingReason(data[0].taskStatus);
    }

    setIsSelectedLoading(false);
  };

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Search & select employee to offboard" />
      </Grid>
      <Grid item xs={8}>
        <Box mt={2}>
          {permOffboardingAll && (
            <AllEmployeeSelect
              selectedOffboardUser={selectedOffboardUser}
              setSelectedOffboardUser={setSelectedOffboardUser}
              setIsSelectedLoading={setIsSelectedLoading}
            />
          )}

          {permOffboardingTeam && !permOffboardingAll && !permOffboardingNfte && (
            <>
              <Box mt={2} mb={2} width={600}>
                <AlertBox
                  severity={"info"}
                  message={
                    "In LPSync, you can only offboard a Non Full-Time Employee (such as a partner or a contractor) who directly reports to you. All offboard requests for Full-Time Employees must be sent to HR."
                  }
                />
              </Box>
              <TeamEmployeeSelect
                selectedOffboardUser={selectedOffboardUser}
                setSelectedOffboardUser={setSelectedOffboardUser}
                setIsSelectedLoading={setIsSelectedLoading}
              />
            </>
          )}

          {!permOffboardingAll && permOffboardingNfte && (
            <>
              <Box mt={2} mb={2} width={600}>
                <AlertBox
                  severity={"info"}
                  message={
                    "In LPSync, you can only offboard any Non Full-Time Employee (such as a partner or a contractor). All offboard requests for Full-Time Employees must be sent to HR."
                  }
                />
              </Box>
              <AllEmployeeSelect
                type="NonFte"
                selectedOffboardUser={selectedOffboardUser}
                setSelectedOffboardUser={setSelectedOffboardUser}
                setIsSelectedLoading={setIsSelectedLoading}
              />
            </>
          )}
        </Box>
        {isOffboarding && (
          <Box mt={2} mb={2} width={700}>
            <AlertBox
              severity={"error"}
              message={`${selectedOffboardUser?.profile?.firstName} 
                  ${selectedOffboardUser?.profile?.lastName} has an offboarding
                  task that is ${getTaskStatusText(
                    offboardingReason
                  ).toLocaleLowerCase()}.`}
              onClose={clearSelectedOffboardUser}
            />
          </Box>
        )}
        {selectedOffboardUser && (
          <SelectedOffboardUser
            userProfile={selectedOffboardUser?.profile}
            clearSelectedOffboardUser={clearSelectedOffboardUser}
          />
        )}
        {isSelectedLoading && (
          <Box mt={2} width="60ch">
            <LinearProgress className={classes.progressBar} />
            <p>
              Loading {selectedOffboardUser?.profile?.firstName}{" "}
              {selectedOffboardUser?.profile?.lastName}'s information...
            </p>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(OffboardEmployeeSelect));
