import React, { useContext } from "react";
import { TextField, makeStyles, Box } from "@material-ui/core";
import { RequisitionRequestContext } from "../../../RequisitionRequestContextProvider";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "30ch",
  },
}));

const ReqCommissionAmountInput = () => {
  const classes = useStyles();
  const {
    reqCommissionAmount,
    setReqCommissionAmount,
    reqCommissionAmountError,
    setReqCommissionAmountError,
  } = useContext(RequisitionRequestContext);

  const validate = (num) => {
    const regex = /^(?=.*[0-9])[.0-9]+$/;

    return regex.test(num);
  };

  const handleChange = async (e) => {
    const num = e.target.value;

    setReqCommissionAmount(num);

    if (num !== "") {
      const check = await validate(num);

      if (check) {
        setReqCommissionAmountError(false);
      } else {
        setReqCommissionAmountError(true);
      }
    }
  };

  return (
    <Box ml={1.5} mr={1.5}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          color="secondary"
          id="req-commission-amount-input"
          label="Amount"
          helperText="must contain numbers and/or ."
          error={reqCommissionAmountError}
          className={classes.textField}
          value={reqCommissionAmount}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
};

export default ReqCommissionAmountInput;
