import React, {memo, useContext} from "react";
import {Box, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import RequestFormLabel from "../../../../components/typographies/RequestFormTypography";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "30ch",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
  box: {
    display: "flex",
    alignItems: "center",
  },
}));

const JobTitle = () => {
  const classes = useStyles();
  const {jobCode, jobTitle, setJobTitle, jobTitleError, setJobTitleError} =
    useContext(RequisitionRequestContext);

  const handleChange = (value) => {
    setJobTitle(value);

    if (value !== "" && jobTitleError) {
      setJobTitleError(false);
    }
  };

  return (
    <>
      <Grid item container>
        <Grid item xs={4} className={classes.box}>
          <RequestFormLabel title="Enter Job Title" />
        </Grid>

        <Grid item xs={8} className={classes.box}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              color="secondary"
              id="job-title-amount-input"
              label="Job Title*"
              helperText="must be up to 25 characters"
              error={jobTitleError}
              className={classes.textField}
              value={jobTitle}
              onChange={(e) => handleChange(e.target.value)}
              inputProps={{maxLength: 25}}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(JobTitle);
