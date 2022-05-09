import React, {useContext} from "react";
import {
  makeStyles,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {RequisitionRequestContext} from "../../../RequisitionRequestContextProvider";
import {SalaryPeriodOptions} from "../../../../../data/constants/SalaryPeriodOptions";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "19ch",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
}));

const ReqSpendPeriodSelect = () => {
  const classes = useStyles();
  const {
    selectedReqSpendPeriod,
    setSelectedReqSpendPeriod,
    selectedReqSpendPeriodError,
    setSelectedReqSpendPeriodError,
  } = useContext(RequisitionRequestContext);

  const handleChange = (event) => {
    setSelectedReqSpendPeriod(event.target.value);
    setSelectedReqSpendPeriodError(false);
  };

  return (
    <FormControl required color={"secondary"} size="small" variant="outlined">
      <InputLabel id="select-company-label">Salary Period</InputLabel>
      <Select
        labelId="select-company-label"
        id="select-company"
        error={selectedReqSpendPeriodError}
        value={selectedReqSpendPeriod}
        onChange={handleChange}
        className={classes.select}
        label={"Salary Period"}
        color={"secondary"}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {SalaryPeriodOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ReqSpendPeriodSelect;
