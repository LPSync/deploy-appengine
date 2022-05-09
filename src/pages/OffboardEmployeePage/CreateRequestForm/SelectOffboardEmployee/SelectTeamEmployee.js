import React, {memo, useContext, useState} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {useQuery} from "@apollo/client";
import handleError from "../../../../data/handleError";
import {Autocomplete} from "@material-ui/lab";
import {makeStyles, TextField, Typography} from "@material-ui/core";
import {setSelectedOffboardUser} from "../../../../data/redux/offboardRequest/offboardRequestActions";
import {OffboardEmployeeContext} from "../../OffboardEmployeeContextProvider";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import {GET_TEAM_NONFTE_DIRECT_REPORTS} from "../../../../operations/queries/getTeamNonfteDirectReports";

const useStyles = makeStyles(() => ({
  alertBox: {
    width: "60ch",
  },
}));

const SelectTeamEmployee = ({
  selectedOffboardUser,
  setSelectedOffboardUser,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const {setIsSelectedLoading} = useContext(OffboardEmployeeContext);
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
            `${user.profile.firstName} ${user.profile.lastName} ${user.profile.email} ${user.profile.employeeNumber}`
          }
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Search"
              variant="standard"
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

export default connect(
  (state) => ({
    selectedOffboardUser: state.offboardRequest.get("selectedOffboardUser"),
  }),
  {setSelectedOffboardUser}
)(memo(SelectTeamEmployee));
