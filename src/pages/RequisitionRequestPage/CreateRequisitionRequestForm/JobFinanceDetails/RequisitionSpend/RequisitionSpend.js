import React from "react";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import ReqSpendCurrencySelect from "./ReqSpendCurrencySelect";
import ReqSpendAmountInput from "./ReqSpendAmountInput";
import ReqSpendPeriodSelect from "./ReqSpendPeriodSelect";

const useStyles = makeStyles((theme) => ({
  select: {
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

const RequisitionSpend = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <Typography component={'div'} variant="subtitle1" className={classes.leftText}>
            Enter requisition spend
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box className={classes.box}>
            <ReqSpendCurrencySelect />
            <ReqSpendAmountInput />
            <ReqSpendPeriodSelect />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RequisitionSpend;
