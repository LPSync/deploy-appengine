import React, {useState, useEffect, useCallback, memo} from "react";
import {Grid, Typography, makeStyles} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import parse from "autosuggest-highlight/parse";
import {useLazyQuery} from "@apollo/client";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";
import {GET_TIME_ZONE_INFO} from "../../../operations/queries/getTimeZoneInfo";
import {GET_LOCATION_PREDICTION} from "../../../operations/queries/getLocationPrediction";
import {GET_LOCATION_COORDINATES} from "../../../operations/queries/getLocationCoordinates";
import AutocompleteTextField from "../../inputs/AutocompleteTextField";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const TimeZoneSearch = ({
  setHrCity,
  setHrTimeZone,
  setHrTimeZoneId,
  setHrLocationLat,
  setHrLocationLong,
  hrTimeZoneError,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [timeZoneName, setTimeZoneName] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [latLng, setLatLng] = useState({latitude: null, longitude: null});

  const [executeQuery] = useLazyQuery(GET_TIME_ZONE_INFO, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setZoneId(data?.get_time_zone_info?.timeZoneId);
      setTimeZoneName(data?.get_time_zone_info?.timeZoneName);
    },
    onError: (error) => handleError(error)(history),
  });

  const [executeLocationCoordinatesQuery] = useLazyQuery(
    GET_LOCATION_COORDINATES,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        const {lat, lng} = data?.get_location_coordinates || {};
        if (lat && lng) {
          setLatLng({latitude: lat, longitude: lng});
          setHrLocationLat(lat);
          setHrLocationLong(lng);
        }
      },
      onError: (error) => handleError(error)(history),
    }
  );

  const [executeLocationQuery, {data}] = useLazyQuery(GET_LOCATION_PREDICTION, {
    onError: (error) => handleError(error)(history),
  });

  const handleValue = useCallback(
    (location) => {
      setHrCity(location);
      if (location) {
        executeLocationCoordinatesQuery({variables: {search: location}});
      }
    },
    [setHrCity, executeLocationCoordinatesQuery]
  );

  useEffect(() => {
    if (!inputValue) {
      setOptions(value ? [value] : []);
    }
    if (inputValue) {
      executeLocationQuery({variables: {search: inputValue}});
    }
  }, [inputValue, executeLocationQuery]);

  useEffect(() => {
    if (data?.get_location_prediction) {
      setOptions(data?.get_location_prediction);
    }
  }, [data]);

  useEffect(() => {
    if (value) {
      handleValue(value.description);
    }
  }, [value, handleValue]);

  useEffect(() => {
    if (latLng?.latitude && latLng.longitude) {
      executeQuery({variables: latLng});
    }
  }, [executeQuery, latLng]);

  useEffect(() => {
    if (zoneId !== "") {
      setHrTimeZoneId(zoneId);
      setHrTimeZone(timeZoneName);
    }
  }, [zoneId, timeZoneName, setHrTimeZoneId, setHrTimeZone]);

  useEffect(() => {
    if (value === null) {
      setHrCity("");
      setHrTimeZone("");
    }
  }, [value, setHrCity, setHrTimeZone]);

  return (
    <Autocomplete
      id="google-map-demo"
      style={{width: "30ch"}}
      getOptionLabel={(option) => option.description}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <AutocompleteTextField
          {...params}
          error={hrTimeZoneError}
          label="Search for city of time zone"
          fullWidth
        />
      )}
      renderOption={(option) => {
        const matches = option.main_text_matched_substrings;
        const parts = parse(
          option.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{fontWeight: part.highlight ? 700 : 400}}
                >
                  {part.text}
                </span>
              ))}

              <Typography
                component={"div"}
                variant="body2"
                color="textSecondary"
              >
                {option.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default memo(TimeZoneSearch);
