import React, { memo } from "react";
import { Box, Grid, } from "@material-ui/core";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import { validateEmailInput } from "../../../data/helper/validation";
import CustomTextField from "../../inputs/CustomTextField";

const NonLpEmailInput = ({nonLpEmail, setNonLpEmail, nonLpEmailError, setNonLpEmailError}) => {
  const handleChange = email => {
    setNonLpEmail(email);
    if (email !== "") {
      const check = validateEmailInput(email);
        setNonLpEmailError(!!check);
    }
  };

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <RequestFormTypography title="Enter non-LP email"/>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <form noValidate autoComplete="off">
              <CustomTextField
                required
                id="nonlp-email-input"
                label="Non-LP Email"
                error={nonLpEmailError}
                value={nonLpEmail}
                onValueChange={handleChange}
              />
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(NonLpEmailInput);
