import React, {memo, useContext} from "react";
import {Box, Grid, makeStyles, Typography} from "@material-ui/core";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import DateTextField from "../../../../components/inputs/DateTextField";

const useStyles = makeStyles((theme) => ({
  leftText: {
    paddingLeft: theme.spacing(5),
  },
}));

const StartDateInput = () => {
  const classes = useStyles();
  const {
    plannedStartDate,
    setPlannedStartDate,
    plannedStartDateError,
    setPlannedStartDateError,
  } = useContext(RequisitionRequestContext);

  return (
    <Grid item container>
      <Grid item xs={4}>
        <Typography
          component={"div"}
          variant="subtitle1"
          className={classes.leftText}
        >
          Enter planned start date
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Box>
          <DateTextField
            type="date"
            label="Start Date"
            error={plannedStartDateError}
            setError={setPlannedStartDateError}
            value={plannedStartDate}
            onValueChange={setPlannedStartDate}
            minDateInDays={14}
          />

          <Typography
            component={"div"}
            variant="subtitle1"
            style={{color: "#a8a9b8"}}
          >
            must be at least 10 business days or more from today
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(StartDateInput);
