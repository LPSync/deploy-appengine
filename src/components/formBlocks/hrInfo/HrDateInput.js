import React, { memo } from "react";
import DateTextField from "../../inputs/DateTextField";
import { Grid } from "@material-ui/core";

const HrDateInput = ({ ...props }) => {
  return (
    <Grid item style={{paddingBottom: 16}}>
      <DateTextField
        type="datetime-local"
        label="End payroll date &amp; time"
        {...props}
      />
    </Grid>
  );
};

export default memo(HrDateInput);