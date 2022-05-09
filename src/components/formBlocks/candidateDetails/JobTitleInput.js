import React, {memo} from "react";
import {Grid, makeStyles, TextField} from "@material-ui/core";
import RequestFormTypography from "../../typographies/RequestFormTypography";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "30ch"
  },
  leftText: {
    paddingLeft: theme.spacing(5)
  },
  box: {
    display: "flex",
    alignItems: "center"
  }
}));

const JobTitleInput = ({
  jobCode,
  jobError,
  jobTitle,
  setJobTitle,
  setJobError,
  isFilledByRequisition
}) => {
  const classes = useStyles();

  const handleChange = (value) => {
    setJobTitle(value);

    if (value !== "" && jobError) {
      setJobError(false);
    }
  };

  return (
    <>
      {jobCode && (
        <Grid item container>
          <Grid item xs={4} className={classes.box}>
            <RequestFormTypography title="Enter Job Title" />
          </Grid>

          <Grid item xs={8} className={classes.box}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                color="secondary"
                id="job-title-amount-input"
                label="Job Title*"
                helperText="must be up to 25 characters"
                error={jobError}
                className={classes.textField}
                value={jobTitle}
                disabled={isFilledByRequisition}
                onChange={e => handleChange(e.target.value)}
                inputProps={{maxLength: 25}}
              />
            </form>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default memo(JobTitleInput);
