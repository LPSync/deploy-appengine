import React, {useContext, useEffect, useState} from "react";
import {useLazyQuery, useQuery} from "@apollo/client";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import HrTimeZoneSearch from "./HrTimeZoneSearch";
import {OffboardEmployeeContext} from "../../OffboardEmployeeContextProvider";
import {GET_HRTERMINATION_CODES} from "../../../../operations/queries/getHRTerminationCodes";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import DateTextField from "../../../../components/inputs/DateTextField";
import {GET_TIME_ZONE_INFO} from "../../../../operations/queries/getTimeZoneInfo";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "25ch",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
  timeTextField: {
    width: "30ch",
  },
  autocomplete: {
    fontSize: ".9rem",
  },
  notesTextField: {
    width: "100%",
  },
}));

const HrInformation = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    hrTerminationCode,
    hrTerminationType,
    hrSelectedDate,
    setHrSelectedDate,
    setHrTimeZone,
    setHrNotes,
    setHrTerminationCode,
    setHrTerminationType,
    setHrTimeZoneId,
    hrDateError,
    hrTimeZoneError,
    setHrDateError,
    hrLocationLat,
    hrLocationLong,
    setHrPayrollEpoch,
  } = useContext(OffboardEmployeeContext);
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [timeZoneId, setTimeZoneId] = useState("");

  const [executeQuery] = useLazyQuery(GET_TIME_ZONE_INFO, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setHrPayrollEpoch(data?.get_time_zone_info?.epochTime);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    setHrNotes(notes);
    if (timeZoneId !== "") {
      setHrTimeZone(timeZone);
      setHrTimeZoneId(timeZoneId);
    }

    if (timeZone === "") {
      setHrTimeZone("");
      setHrTimeZoneId("");
    }

    if (hrSelectedDate && hrLocationLat && hrLocationLong) {
      executeQuery({
        variables: {
          latitude: hrLocationLat,
          longitude: hrLocationLong,
          date: hrSelectedDate,
        },
      });
    }
  }, [
    notes,
    timeZone,
    timeZoneId,
    setHrNotes,
    setHrTimeZone,
    setHrTimeZoneId,
    hrSelectedDate,
    hrLocationLat,
    hrLocationLong,
  ]);

  const codeHandleChange = (event) => {
    setHrTerminationCode(event.target.value);
  };

  const terminationTypeHandleChange = (event) => {
    setHrTerminationType(event.target.value);
  };

  const {data} = useQuery(GET_HRTERMINATION_CODES, {
    onError: (error) => handleError(error)(history),
  });

  return (
    <>
      <Grid item container>
        <Grid item xs={12}>
          <Typography component={"div"}>
            <Box fontWeight={600}>HR/Payroll Information</Box>
          </Typography>
          <Typography variant="subtitle2">(optional)</Typography>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant="subtitle1"
            className={classes.leftText}
          >
            Select termination code
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="select-termination-code-label">
                Termination Code
              </InputLabel>
              {data && (
                <Select
                  labelId="select-termination-code-label"
                  id="select-termination-code"
                  value={hrTerminationCode}
                  onChange={codeHandleChange}
                  label="Termination Code"
                  className={classes.select}
                  color={"secondary"}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {data.get_hrtermination_codes.map((code) => (
                    <MenuItem key={code.id} value={code.terminationCode}>
                      {code.terminationCode}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant="subtitle1"
            className={classes.leftText}
          >
            Termination is
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="termination-reason-select-label">
                Termination
              </InputLabel>
              <Select
                labelId="termination-type-select-label"
                id="termination-type-select"
                value={hrTerminationType}
                onChange={terminationTypeHandleChange}
                label="Termination"
                className={classes.select}
                color={"secondary"}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                <MenuItem value={"Regrettable"}>Regrettable</MenuItem>
                <MenuItem value={"Non-Regrettable"}>Non-Regrettable</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant="subtitle1"
            className={classes.leftText}
          >
            End payroll date &amp; time
          </Typography>
        </Grid>
        <Grid item xs={8} container>
          <Grid item xs={5}>
            <DateTextField
              type="datetime-local"
              label="End payroll date &amp; time"
              error={hrDateError}
              setError={setHrDateError}
              value={hrSelectedDate}
              onValueChange={setHrSelectedDate}
            />
          </Grid>
          <Grid item xs={7}>
            <HrTimeZoneSearch
              setCity={setCity}
              setTimeZone={setTimeZone}
              setTimeZoneId={setTimeZoneId}
              hrTimeZoneError={hrTimeZoneError}
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
      <Grid item container>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant="subtitle1"
            className={classes.leftText}
          >
            Payroll notes
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="hr-notes"
                placeholder="notes"
                multiline
                minRows={2}
                maxRows={4}
                className={classes.notesTextField}
                inputProps={{maxLength: 191}}
                helperText="maximum length is 191 characters"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default HrInformation;
