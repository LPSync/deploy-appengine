import React, { memo } from "react";
import { Box, Grid } from "@material-ui/core";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import DateTextField from "../../inputs/DateTextField";

const StartDateInput = ({
  startDate,
  setStartDate,
  startDateError,
  setStartDateError,
}) => {
  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Enter planned start date" />
      </Grid>
      <Grid item xs={8}>
        <Box>
          <DateTextField
            type="date"
            label="Start Date"
            error={startDateError}
            setError={setStartDateError}
            value={startDate}
            onValueChange={setStartDate}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(StartDateInput);
