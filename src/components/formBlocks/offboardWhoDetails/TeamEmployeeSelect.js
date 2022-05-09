import React, {memo, useState} from "react";
import {useHistory} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {Autocomplete} from "@material-ui/lab";
import {makeStyles, Typography} from "@material-ui/core";
import handleError from "../../../data/handleError";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import {GET_TEAM_NONFTE_DIRECT_REPORTS} from "../../../operations/queries/getTeamNonfteDirectReports";
import AutocompleteTextField from "../../inputs/AutocompleteTextField";

const useStyles = makeStyles(() => ({
  alertBox: {
    width: "60ch",
  },
}));

const TeamEmployeeSelect = ({
  selectedOffboardUser,
  setSelectedOffboardUser,
  setIsSelectedLoading,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [userDirectReports, setUserDirectReports] = useState();

  useQuery(GET_TEAM_NONFTE_DIRECT_REPORTS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setUserDirectReports(data?.get_team_nonfte_direct_reports);
    },
    onError: (error) => handleError(error)(history),
  });

  return (
    <div>
      {!userDirectReports && <LoadingCircle text={"loading employees..."} />}
      {userDirectReports && !selectedOffboardUser && (
        <Autocomplete
          id="select-direct-report-autocomplete"
          options={userDirectReports}
          className={classes.alertBox}
          renderOption={(user) => (
            <Typography component={"div"} variant="subtitle1">
              {user.profile.firstName} {user.profile.lastName} |{" "}
              {user.profile.location} | {user.profile.jobTitle}
            </Typography>
          )}
          getOptionLabel={(user) =>
            `${user.profile.firstName} ${user.profile.lastName} | ${user.profile.location} | ${user.profile.jobTitle}`
          }
          renderInput={(params) => (
            <AutocompleteTextField
              {...params}
              required
              label="Search"
              helperText="Search by Name, Email, or HRIS ID"
            />
          )}
          onChange={(event, newValue) => {
            setIsSelectedLoading(true);
            setSelectedOffboardUser(newValue);
          }}
        />
      )}
    </div>
  );
};

export default memo(TeamEmployeeSelect);
