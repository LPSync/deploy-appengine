import React, {memo, useState} from "react";
import {useQuery} from "@apollo/client";
import {Box, CircularProgress, Grid} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import {GET_ULTI_LOCATIONS} from "../../../operations/queries/getUltiLocations";
import AutocompleteTextField from "../../inputs/AutocompleteTextField";

const LocationSelect = ({
  setLocation,
  location,
  locationError,
  setLocationError,
  isFilledByRequisition,
}) => {
  const [locationList, setLocationList] = useState();
  const {loading} = useQuery(GET_ULTI_LOCATIONS, {
    onCompleted: (data) => {
      setLocationList(
        data.get_ulti_locations?.map((l) => ({
          locationCode: l.locationCode,
          locationDescription: l.locationDescription,
          locationCountryCode: l.locationCountryCode,
        }))
      );
    },
  });

  const handleChange = (value) => {
    if (value) {
      setLocation({...value});
      setLocationError(false);
    } else {
      setLocation(null);
    }
  };

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Select location" />
      </Grid>
      <Grid item xs={8}>
        <Box>
          {loading ? (
            <CircularProgress />
          ) : (
            locationList && (
              <Autocomplete
                value={location}
                options={locationList}
                getOptionLabel={(option) => option.locationDescription}
                style={{width: 400}}
                disabled={isFilledByRequisition}
                renderInput={(params) => (
                  <AutocompleteTextField
                    {...params}
                    required
                    error={locationError}
                    label="Select Location"
                  />
                )}
                getOptionSelected={(option, value) =>
                  option.locationCode === value.locationCode
                }
                onChange={(event, newValue) => {
                  handleChange(newValue);
                }}
              />
            )
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(LocationSelect);
