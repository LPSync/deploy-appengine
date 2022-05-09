import React, { memo } from "react";
import { Box, Grid } from "@material-ui/core";
import RequestFormTypography from "../typographies/RequestFormTypography";
import CustomTextField from "../inputs/CustomTextField";

const JobTitleInput = ({ jobTitle, setJobTitle, jobTitleError, setJobTitleError}) => {
  const handleChange = title => {
    setJobTitle(title);
    setJobTitleError(false);
  };

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <RequestFormTypography title="Enter job title"/>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <form noValidate autoComplete="off">
              <CustomTextField
                required
                color="secondary"
                id="job-title-input"
                label="Job Title"
                error={jobTitleError}
                value={jobTitle}
                onValueChange={handleChange}
              />
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(JobTitleInput);
