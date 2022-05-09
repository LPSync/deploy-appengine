import React, { useContext } from "react";
import { TextField, makeStyles, Box } from "@material-ui/core";
import { RequisitionRequestContext } from "../../../RequisitionRequestContextProvider";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "30ch",
  },
}));

const ReqSpendAmountInput = () => {
  const classes = useStyles();
  const {
    reqSpendAmount,
    setReqSpendAmount,
    reqSpendAmountError,
    setReqSpendAmountError,
  } = useContext(RequisitionRequestContext);

  const validate = (num) => {
    const regex = /^(?=.*[0-9])[.0-9]+$/;

    return regex.test(num);
  };

  const handleChange = async (e) => {
    const num = e.target.value;

    setReqSpendAmount(num);

    if (num !== "") {
      const check = await validate(num);

      if (check) {
        setReqSpendAmountError(false);
      } else {
        setReqSpendAmountError(true);
      }
    }
  };

  return (
    <Box ml={1.5} mr={1.5}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          color="secondary"
          id="req-spend-amount-input"
          label="Amount"
          helperText="must contain numbers and/or ."
          error={reqSpendAmountError}
          className={classes.textField}
          value={reqSpendAmount}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
};

export default ReqSpendAmountInput;
