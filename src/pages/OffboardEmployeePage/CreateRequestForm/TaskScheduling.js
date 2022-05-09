import React, { memo, useContext, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
  Paper,
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {OffboardEmployeeContext} from "../OffboardEmployeeContextProvider";
import ColorCheckbox from "../../../components/checkboxes/ColorCheckbox";
import DateTextField from "../../../components/inputs/DateTextField";
import TaskScheduleTypes from "../../../data/constants/TaskScheduleTypes";
import {useLazyQuery} from "@apollo/client";
import {GET_TIME_ZONE_INFO} from "../../../operations/queries/getTimeZoneInfo";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";
import InfoTooltip from "../../../components/tooltips/InfoTooltip";
import HrTimeZoneSearch from "./HrInformation/HrTimeZoneSearch";

const useStyles = makeStyles((theme) => ({
  leftText: {
    paddingLeft: theme.spacing(5),
  },
  timeTextField: {
    width: "30ch",
  },
  select: {
    width: "25ch",
  },
  autocomplete: {
    fontSize: ".9rem",
  },
  label: {
    fontSize: "1rem",
  },
  typeBox: {
    display: "flex",
  },
  paper: {
    backgroundColor: theme.palette.info.dark,
    alignItems: "center",
    padding: "0.5em 0.75em 0.5em",
  },
}));

const TaskScheduling = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    offboardingTypeError,
    setOffboardingTypeError,
    offboardingType,
    setOffboardingType,
    setSendTerminationsEmail,
    selectedDate,
    setSelectedDate,
    setTaskTimeZone,
    setTaskTimeZoneError,
    selectedDateError,
    setSelectedDateError,
    setTaskTimeZoneId,
    setTaskScheduleEpoch,
    taskLocationLat,
    taskLocationLong,
  } = useContext(OffboardEmployeeContext);
  const [city, setCity] = useState("");
  const [emailChecked, setEmailChecked] = useState(true);
  const [timeZone, setTimeZone] = useState("");
  const [timeZoneId, setTimeZoneId] = useState("");
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(false);

  const [executeQuery] = useLazyQuery(GET_TIME_ZONE_INFO, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setTaskScheduleEpoch(data?.get_time_zone_info?.epochTime);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    setSendTerminationsEmail(emailChecked);

    if (timeZoneId !== "") {
      setTaskTimeZone(timeZone);
      setTaskTimeZoneId(timeZoneId);
      setTaskTimeZoneError(false);
    }
    if (timeZone === "") {
      setTaskTimeZone("");
      setTaskTimeZoneId("");
    }

    if (selectedDate && taskLocationLat && taskLocationLong) {
      executeQuery({
        variables: {
          latitude: taskLocationLat,
          longitude: taskLocationLong,
          date: selectedDate,
        },
      });
    }
  }, [
    emailChecked,
    timeZone,
    setSendTerminationsEmail,
    setTaskTimeZone,
    setTaskTimeZoneError,
    setTaskTimeZoneId,
    timeZoneId,
    selectedDate,
    taskLocationLat,
    taskLocationLong,
  ]);

  const typeHandleChange = (event) => {
    const value = event.target.value;

    setOffboardingType(value);
    setOffboardingTypeError(false);
    if (value === TaskScheduleTypes.SENSITIVE) {
      setEmailChecked(false);
      setIsCheckboxDisabled(true);
    } else {
      setEmailChecked(true);
      setIsCheckboxDisabled(false);
    }
  };

  const handleChange = (event) => {
    setEmailChecked(event.target.checked);
  };

  return (
    <>
      <Grid item container>
        <Grid item xs={12}>
          <Typography component={"div"}>
            <Box fontWeight={600}>Task Scheduling</Box>
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
            Select offboarding type
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box className={classes.typeBox}>
            <Box>
              <FormControl
                required
                error={offboardingTypeError}
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="offboarding-type">Offboarding Type</InputLabel>
                <Select
                  labelId="offboarding-type-select-label"
                  id="offboarding-type-select"
                  value={offboardingType}
                  onChange={typeHandleChange}
                  label="Offboarding Type"
                  className={classes.select}
                  color={"secondary"}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.values(TaskScheduleTypes).map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {offboardingType && (
              <Box ml={1}>
                <Paper className={classes.paper}>
                  <Typography color="inherit" variant="subtitle1">
                    {offboardingType === TaskScheduleTypes.IMMEDIATE
                      ? "The user will be offboarded from all IT systems immediately. Subject to approval."
                      : offboardingType === TaskScheduleTypes.SCHEDULED
                      ? "The user will be offboarded from all IT systems at the scheduled date & time. Subject to approval."
                      : "The user will be offboarded from all IT systems at the scheduled date & time and a notification will only be sent to the terminations team after the scheduled date & time. Subject to approval."}
                  </Typography>
                </Paper>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={4}>
          <Box className={classes.leftText}>
            <InfoTooltip placement="bottom-start">
              <>
                <Typography color="inherit">
                  If checked, a notification will be sent to the terminations
                  team to cancel user accounts.
                </Typography>
                <br />
                <Typography color="inherit">
                  If <b>not</b> checked, a notification will <b>only</b> be sent
                  to the terminations team after the offboarding has completed.
                </Typography>
              </>
            </InfoTooltip>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <FormGroup row>
              <FormControlLabel
                classes={{label: classes.label}}
                control={
                  <ColorCheckbox
                    disabled={isCheckboxDisabled}
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={emailChecked}
                    onChange={handleChange}
                    name="emailChecked"
                  />
                }
                label="Send email notification to terminations@liveperson.com"
              />
            </FormGroup>
          </Box>
        </Grid>
      </Grid>
      {(offboardingType === TaskScheduleTypes.SCHEDULED ||
        offboardingType === TaskScheduleTypes.SENSITIVE) && (
        <Grid item container>
          <Grid item xs={4}>
            <Typography
              component={"div"}
              variant="subtitle1"
              className={classes.leftText}
            >
              Schedule date &amp; time of offboarding
            </Typography>
          </Grid>
          <Grid item xs={8} container>
            <Grid item xs={5}>
              <DateTextField
                type="datetime-local"
                label="Offboarding date &amp; time"
                error={selectedDateError}
                setError={setSelectedDateError}
                value={selectedDate}
                onValueChange={setSelectedDate}
              />
            </Grid>
            <Grid item xs={7}>
              <HrTimeZoneSearch
                setCity={setCity}
                setTimeZone={setTimeZone}
                setTimeZoneId={setTimeZoneId}
              />
            </Grid>
            <Grid item>
              {timeZone !== "" && (
                <Box mt={2}>
                  <p>
                    The time zone of {city} is {timeZone}
                  </p>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default memo(TaskScheduling);
