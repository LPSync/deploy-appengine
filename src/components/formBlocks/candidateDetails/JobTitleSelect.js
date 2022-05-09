import React, {memo, useState} from "react";
import {useQuery} from "@apollo/client";
import {CircularProgress, Grid, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {useHistory} from "react-router-dom";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import {GET_ULTI_JOB_DATA} from "../../../operations/queries/getUltiJobData";
import handleError from "../../../data/handleError";
import {jobToString} from "../../../data/helper/helpers";
import AutocompleteTextField from "../../inputs/AutocompleteTextField";

const JobTitleSelect = ({
  job,
  setJob,
  jobError,
  setJobError,
  isFilledByRequisition,
}) => {
  const history = useHistory();
  const [jobData, setJobData] = useState(null);

  const {loading} = useQuery(GET_ULTI_JOB_DATA, {
    onCompleted: (data) =>
      setJobData(
        data.get_ulti_job_data?.map((j) => ({
          jobCode: j.jobCode,
          jobTitle: j.jobTitle,
        }))
      ),
    onError: (error) => handleError(error)(history),
  });

  const handleChange = (value) => {
    if (value) {
      setJob({jobCode: value.jobCode, jobTitle: value.jobTitle});
    } else {
      setJob(null);
    }
    if (jobError) {
      setJobError(false);
    }
  };

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <RequestFormTypography title="Select job title" />
        </Grid>
        <Grid item xs={8}>
          {loading ? (
            <CircularProgress />
          ) : (
            jobData && (
              <Autocomplete
                value={job}
                options={jobData}
                getOptionLabel={(option) => jobToString(option)}
                style={{width: 400}}
                disabled={isFilledByRequisition}
                renderInput={(params) => (
                  <AutocompleteTextField
                    {...params}
                    required
                    error={jobError}
                    label="Select Job Title"
                  />
                )}
                getOptionSelected={(option, value) =>
                  option.jobCode === value.jobCode
                }
                onChange={(event, newValue) => {
                  handleChange(newValue);
                }}
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default memo(JobTitleSelect);
