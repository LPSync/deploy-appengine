import React, {memo} from "react";
import {Box, Grid, makeStyles} from "@material-ui/core";
import {isEmpty, validateNameInput} from "../../../data/helper/validation";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import CustomTextField from "../../inputs/CustomTextField";

const useStyles = makeStyles((theme) => ({
  fields: {
    display: "flex",
  },
  firstField: {
    marginRight: theme.spacing(2),
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
}));

const FullNameInput = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  firstNameError,
  setFirstNameError,
  lastNameError,
  setLastNameError,
}) => {
  const classes = useStyles();

  const handleFirstNameChange = (name) => {
    setFirstName(name);
    const check = isEmpty(name) || validateNameInput(name);
    setFirstNameError(!!check);
  };

  const handleLastNameChange = (name) => {
    setLastName(name);
    const check = isEmpty(name) || validateNameInput(name);
    setLastNameError(!!check);
  };

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Enter first and last name" />
      </Grid>
      <Grid item xs={8}>
        <Box className={classes.fields}>
          <form className={classes.firstField} noValidate autoComplete="off">
            <CustomTextField
              required
              small
              id="first-name-input"
              label="First Name"
              helperText="must contain letters only"
              error={firstNameError}
              value={firstName}
              onValueChange={handleFirstNameChange}
            />
          </form>
          <form noValidate autoComplete="off">
            <CustomTextField
              required
              small
              id="last-name-input"
              label="Last Name"
              helperText="must contain letters only"
              error={lastNameError}
              value={lastName}
              onValueChange={handleLastNameChange}
            />
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(FullNameInput);
