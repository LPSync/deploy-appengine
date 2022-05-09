import React, { memo, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import CustomTextField from "../../inputs/CustomTextField";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import { validatePhoneNumberInput } from "../../../data/helper/validation";

const MobileNumberInput = ({ mobileNumber, setMobileNumber }) => {
  const [numError, setNumError] = useState(false);

  const handleChange = num => {
    setMobileNumber(num);
    if (num !== "") {
      const check = validatePhoneNumberInput(num);
      setNumError(!!check);
    }
  };

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Enter mobile number" subtitle="(optional)"/>
      </Grid>
      <Grid item xs={8}>
        <Box>
          <form noValidate autoComplete="off">
            <CustomTextField
              small
              color="secondary"
              id="mobile-number-input"
              label="Mobile Number"
              helperText="must contain numbers and/or () + -"
              error={numError}
              value={mobileNumber}
              onValueChange={handleChange}
            />
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(MobileNumberInput);
