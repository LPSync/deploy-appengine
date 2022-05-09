import React, {memo} from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import EmployeeTypes from "../../../data/constants/EmployeeTypes";

const useStyles = makeStyles(() => ({
  select: {
    width: "30ch",
  },
}));

const EmployeeTypeSelect = ({
  employeeType,
  setEmployeeType,
  employeeTypeError,
  setEmployeeTypeError,
  isFilledByRequisition,
  setIsGoogleAccountNeeded,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setEmployeeType(event.target.value);
    setEmployeeTypeError(false);

    if (event.target.value === EmployeeTypes.SALES) {
      setIsGoogleAccountNeeded(false);
    } else {
      setIsGoogleAccountNeeded(true);
    }
  };

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Select employee type" />
      </Grid>
      <Grid item xs={8}>
        <Box>
          <FormControl required color="secondary" variant="outlined">
            <InputLabel id="select-employee-type-label">
              Employee Type
            </InputLabel>
            <Select
              labelId="select-employee-type-label"
              id="select-employee-type"
              error={employeeTypeError}
              value={employeeType}
              onChange={handleChange}
              className={classes.select}
              disabled={isFilledByRequisition}
              label={"Employee Type"}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {Object.values(EmployeeTypes)
                ?.filter((type) => type !== EmployeeTypes.FULL_TIME)
                ?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(EmployeeTypeSelect);
