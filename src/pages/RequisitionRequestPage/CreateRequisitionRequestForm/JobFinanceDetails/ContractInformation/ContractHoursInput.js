import React, { useContext } from "react";
import { TextField, makeStyles, Box } from "@material-ui/core";
import { RequisitionRequestContext } from "../../../RequisitionRequestContextProvider";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "20ch",
  },
}));

const ContractHoursInput = () => {
  const classes = useStyles();
  const {
    contractHours,
    setContractHours,
    contractHoursError,
    setContractHoursError,
  } = useContext(RequisitionRequestContext);

  const validate = (num) => {
    const regex = /^(?=.*[0-9])[0-9]+$/;

    return regex.test(num);
  };

  const handleChange = async (e) => {
    const num = e.target.value;

    setContractHours(num);

    if (num !== "") {
      const check = await validate(num);

      if (check) {
        setContractHoursError(false);
      } else {
        setContractHoursError(true);
      }
    }
  };

  return (
    <Box ml={1.5} mr={1.5}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          color="secondary"
          id="contract-hours-input"
          label="Hours per Week"
          helperText="must contain numbers only"
          error={contractHoursError}
          className={classes.textField}
          value={contractHours}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
};

export default ContractHoursInput;
