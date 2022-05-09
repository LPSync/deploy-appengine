import React, {useContext} from "react";
import {useQuery} from "@apollo/client";
import {Box, Grid, makeStyles, Typography} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {GET_ULTI_LOCATIONS} from "../../../../operations/queries/getUltiLocations";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import AutocompleteTextField from "../../../../components/inputs/AutocompleteTextField";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "30ch",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
}));

const LocationSelect = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    setLocation,
    locationError,
    setLocationError,
    selectedLocation,
    setSelectedLocation,
  } = useContext(RequisitionRequestContext);

  const {data} = useQuery(GET_ULTI_LOCATIONS, {
    onError: (error) => handleError(error)(history),
  });

  const handleChange = (value) => {
    setSelectedLocation(value);
    if (value) {
      setLocation({
        description: value.locationDescription,
        countryCode: value.locationCountryCode,
        locationCode: value.locationCode,
      });
    } else {
      setLocation(null);
    }

    setLocationError(false);
  };

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant="subtitle1"
            className={classes.leftText}
          >
            Select location
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box>
            {data && (
              <Autocomplete
                value={selectedLocation}
                options={data.get_ulti_locations}
                getOptionLabel={(option) =>
                  `${option.locationDescription} (${option.locationCountryCode})`
                }
                style={{width: 400}}
                renderInput={(params) => (
                  <AutocompleteTextField
                    {...params}
                    required
                    error={locationError}
                    label="Select Location"
                  />
                )}
                onChange={(event, newValue) => {
                  handleChange(newValue);
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LocationSelect;
