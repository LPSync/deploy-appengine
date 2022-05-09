import React, {memo, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {Box, Grid, makeStyles} from "@material-ui/core";
import DateTextField from "../../inputs/DateTextField";
import TimeZoneSearch from "../hrInfo/TimeZoneSearch";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import {GET_TIME_ZONE_INFO} from "../../../operations/queries/getTimeZoneInfo";
import handleError from "../../../data/handleError";

const useStyles = makeStyles(() => ({
  box: {
    display: "flex",
    alignItems: "center",
  },
}));

const ScheduleDateTimeInput = ({
  scheduleDate,
  scheduleDateError,
  scheduleTimeZone,
  scheduleTimeZoneError,
  setScheduleDate,
  setScheduleDateError,
  setScheduleTimeZone,
  setScheduleTimeZoneId,
  setScheduleEpoch,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [city, setCity] = useState("");
  const [scheduleLocationLat, setScheduleLocationLat] = useState("");
  const [scheduleLocationLong, setScheduleLocationLong] = useState("");

  const [executeQuery] = useLazyQuery(GET_TIME_ZONE_INFO, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setScheduleEpoch(data?.get_time_zone_info?.epochTime);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (scheduleDate && scheduleLocationLat && scheduleLocationLong) {
      executeQuery({
        variables: {
          latitude: scheduleLocationLat,
          longitude: scheduleLocationLong,
          date: scheduleDate,
        },
      });
    }
  }, [scheduleDate, scheduleLocationLat, scheduleLocationLong]);

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Schedule date, time & time zone of offboarding" />
      </Grid>
      <Grid item xs={8} container>
        <Grid item xs={5}>
          <DateTextField
            type="datetime-local"
            label="Offboarding date &amp; time"
            error={scheduleDateError}
            setError={setScheduleDateError}
            value={scheduleDate}
            onValueChange={setScheduleDate}
          />
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.box}>
            <Box mr={2}>
              <TimeZoneSearch
                setHrCity={setCity}
                setHrTimeZone={setScheduleTimeZone}
                setHrTimeZoneId={setScheduleTimeZoneId}
                setHrLocationLat={setScheduleLocationLat}
                setHrLocationLong={setScheduleLocationLong}
                hrTimeZoneError={scheduleTimeZoneError}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item>
          {scheduleTimeZone && (
            <Box mt={2}>
              <p>
                The time zone of {city} is {scheduleTimeZone}
              </p>
            </Box>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(ScheduleDateTimeInput);
