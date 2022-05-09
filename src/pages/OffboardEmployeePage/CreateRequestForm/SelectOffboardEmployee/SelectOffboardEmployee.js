import React, {memo, useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {useLazyQuery} from "@apollo/client";
import {Box, makeStyles} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import {OffboardEmployeeContext} from "../../OffboardEmployeeContextProvider";
import {AuthUserContext} from "../../../../AuthUserContextProvider";
import SelectAllEmployee from "./SelectAllEmployee";
import SelectTeamEmployee from "./SelectTeamEmployee";
import SelectedOffboardUser from "./SelectedOffboardUser";
import {setSelectedOffboardUser} from "../../../../data/redux/offboardRequest/offboardRequestActions";
import {SEARCH_USER_OFFBOARDING_TASK} from "../../../../operations/queries/searchUserOffboardingTask";
import handleError from "../../../../data/handleError";

const useStyles = makeStyles((theme) => ({
  progressBar: {
    background: "" + theme.palette.warning.main,
  },
}));

const SelectOffboardEmployee = ({
  selectedOffboardUser,
  setSelectedOffboardUser,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const {permOffboardingAll, permOffboardingTeam, permOffboardingNfte} =
    useContext(AuthUserContext);
  const {
    setSelectedTransferUser,
    setIsOffboarding,
    setOffboardingReason,
    setIsBtnDisabled,
    setTaskScheduleEpoch,
    setOffboardingType,
    setSelectedDate,
    setHrTerminationCode,
    setHrTerminationType,
    setHrSelectedDate,
    isSelectedLoading,
    setIsSelectedLoading,
    setAllUserAliases,
  } = useContext(OffboardEmployeeContext);

  const clearSelectedOffboardUser = () => {
    setIsSelectedLoading(false);
    setSelectedOffboardUser("");
    setSelectedTransferUser("");
    setIsOffboarding("");
    setOffboardingReason("");
    setOffboardingType("");
    setSelectedDate("");
    setHrTerminationCode("");
    setHrTerminationType("");
    setHrSelectedDate("");
    setIsBtnDisabled(false);
    setTaskScheduleEpoch(null);
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
      setIsBtnDisabled(true);
      setOffboardingReason(data[0].taskStatus);
    } else {
      setAllUserAliases([selectedOffboardUser?.profile?.email]);
    }

    setIsSelectedLoading(false);
  };

  return (
    <div>
      {permOffboardingAll && <SelectAllEmployee />}
      {permOffboardingTeam && !permOffboardingAll && !permOffboardingNfte && (
        <SelectTeamEmployee />
      )}
      {!permOffboardingAll && permOffboardingNfte && (
        <SelectAllEmployee type="NonFte" />
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
    </div>
  );
};

export default connect(
  (state) => ({
    selectedOffboardUser: state.offboardRequest.get("selectedOffboardUser"),
  }),
  {setSelectedOffboardUser}
)(memo(SelectOffboardEmployee));
