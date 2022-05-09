import React, { useContext } from "react";
import { TextField, makeStyles, Box } from "@material-ui/core";
import { RequisitionRequestContext } from "../../../RequisitionRequestContextProvider";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "20ch",
  },
}));

const ContractMonthsInput = () => {
  const classes = useStyles();
  const {
    contractMonths,
    setContractMonths,
    contractMonthsError,
    setContractMonthsError,
  } = useContext(RequisitionRequestContext);

  const validate = (num) => {
    const regex = /^(?=.*[0-9])[0-9]+$/;

    return regex.test(num);
  };

  const handleChange = async (e) => {
    const num = e.target.value;

    setContractMonths(num);

    if (num !== "") {
      const check = await validate(num);

      if (check) {
        setContractMonthsError(false);
      } else {
        setContractMonthsError(true);
      }
    }
  };

  return (
    <Box ml={1.5} mr={1.5}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          color="secondary"
          id="contract-months-input"
          label="Number of Months"
          helperText="must contain numbers only"
          error={contractMonthsError}
          className={classes.textField}
          value={contractMonths}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
};

export default ContractMonthsInput;
