import React, { useContext } from "react";
import { TextField, makeStyles, Box } from "@material-ui/core";
import { RequisitionRequestContext } from "../../../RequisitionRequestContextProvider";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "30ch",
  },
}));

const ReqBonusAmountInput = () => {
  const classes = useStyles();
  const {
    reqBonusAmount,
    setReqBonusAmount,
    reqBonusAmountError,
    setReqBonusAmountError,
  } = useContext(RequisitionRequestContext);

  const validate = (num) => {
    const regex = /^(?=.*[0-9])[.0-9]+$/;

    return regex.test(num);
  };

  const handleChange = async (e) => {
    const num = e.target.value;

    setReqBonusAmount(num);

    if (num !== "") {
      const check = await validate(num);

      if (check) {
        setReqBonusAmountError(false);
      } else {
        setReqBonusAmountError(true);
      }
    }
  };

  return (
    <Box ml={1.5} mr={1.5}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          color="secondary"
          id="req-bonus-amount-input"
          label="Amount"
          helperText="must contain numbers and/or ."
          error={reqBonusAmountError}
          className={classes.textField}
          value={reqBonusAmount}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
};

export default ReqBonusAmountInput;
