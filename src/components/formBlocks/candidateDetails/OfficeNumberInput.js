import React, { memo, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import { validatePhoneNumberInput } from "../../../data/helper/validation";
import CustomTextField from "../../inputs/CustomTextField";

const OfficeNumberInput = ({ officeNumber, setOfficeNumber }) => {
  const [numError, setNumError] = useState(false);

  const handleChange = num => {
    setOfficeNumber(num);
    if (num !== "") {
      const check = validatePhoneNumberInput(num);
      setNumError(!!check);
    }
  };

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Enter office number" subtitle="(optional)"/>
      </Grid>
      <Grid item xs={8}>
        <Box>
          <form noValidate autoComplete="off">
            <CustomTextField
              small
              color="secondary"
              id="office-number-input"
              label="Office Number"
              helperText="must contain numbers and/or () + -"
              error={numError}
              value={officeNumber}
              onValueChange={handleChange}
            />
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(OfficeNumberInput);
