import React, {memo, useContext} from "react";
import {useQuery} from "@apollo/client";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SelectTransferEmployee from "./SelectTransferEmployee";
import {GET_GOOGLE_USER_ALIASES} from "../../../operations/queries/getGoogleUserAliases";
import {OffboardEmployeeContext} from "../OffboardEmployeeContextProvider";
import ColorCheckbox from "../../../components/checkboxes/ColorCheckbox";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
  emailBox: {
    width: "60ch",
    height: 125,
    overflow: "auto",
    border: "1px solid " + theme.palette.secondary.main,
    borderRadius: "5px",
    paddingLeft: "1rem",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
  label: {
    fontSize: "1rem",
  },
}));

const DataTransfer = ({selectedOffboardUser}) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    selectedTransferUser,
    setSelectedTransferUser,
    checkedDrive,
    setCheckedDrive,
    checkedCalendar,
    setCheckedCalendar,
    googleUserAliases,
    setGoogleUserAliases,
  } = useContext(OffboardEmployeeContext);
  const selectedUserEmail = selectedOffboardUser?.profile?.email;

  const {error} = useQuery(GET_GOOGLE_USER_ALIASES, {
    variables: {search: selectedUserEmail},
    onCompleted: (data) => setGoogleUserAliases(data.get_google_user_aliases),
    onError: (error) => handleError(error)(history),
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  if (selectedTransferUser) {
    setSelectedTransferUser(selectedTransferUser);
  }

  const handleCheckedDrive = (event) => {
    setCheckedDrive(event.target.checked);
  };
  const handleCheckedCalendar = (event) => {
    setCheckedCalendar(event.target.checked);
  };

  const handleAliasChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    let newState = googleUserAliases.map((alias) => {
      if (alias.alias === value) {
        return {
          ...alias,
          isChecked: checked,
        };
      } else return alias;
    });

    setGoogleUserAliases(newState);
  };

  return (
    <>
      <Grid item container>
        <Grid item xs={12}>
          <Typography component={"div"}>
            <Box fontWeight={600}>Data Transfer</Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant="subtitle1"
            className={classes.leftText}
          >
            Search &amp; select who to transfer to
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <SelectTransferEmployee />
        </Grid>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant="subtitle1"
            className={classes.leftText}
          >
            Select what needs to be transferred
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <FormGroup row>
            <FormControlLabel
              classes={{label: classes.label}}
              control={
                <ColorCheckbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  checked={checkedDrive}
                  onChange={handleCheckedDrive}
                  name="checkedDrive"
                />
              }
              label="Google Drive"
            />
            <FormControlLabel
              classes={{label: classes.label}}
              control={
                <ColorCheckbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  checked={checkedCalendar}
                  onChange={handleCheckedCalendar}
                  name="checkedCalendar"
                />
              }
              label="Google Calendar"
            />
          </FormGroup>
          <Box className={classes.emailBox}>
            <FormGroup>
              {selectedUserEmail && (
                <FormControlLabel
                  disabled
                  control={
                    <Checkbox
                      checked
                      name="checkedPrimary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                    />
                  }
                  label={
                    <Typography
                      component={"div"}
                      style={{color: "black", fontSize: "1rem"}}
                    >
                      {selectedUserEmail}
                    </Typography>
                  }
                />
              )}
              {googleUserAliases && (
                <>
                  {googleUserAliases.map(
                    (user, index) =>
                      user.alias !== "none" && (
                        <FormControlLabel
                          key={index}
                          classes={{label: classes.label}}
                          control={
                            <ColorCheckbox
                              icon={
                                <CheckBoxOutlineBlankIcon fontSize="small" />
                              }
                              checkedIcon={<CheckBoxIcon fontSize="small" />}
                              checked={user.isChecked}
                              value={user.alias}
                              onChange={handleAliasChange}
                              name={user.alias}
                            />
                          }
                          label={`${user.alias}`}
                        />
                      )
                  )}
                </>
              )}
            </FormGroup>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default connect(
  (state) => ({
    selectedOffboardUser: state.offboardRequest.get("selectedOffboardUser"),
  }),
  {}
)(memo(DataTransfer));
