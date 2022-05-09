import React from "react";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import ReqBonusAmountInput from "./ReqBonusAmountInput";
import ReqBonusTypeSelect from "./ReqBonusTypeSelect";

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
    <Grid item container>
      <Grid item xs={4}>
        <Typography component={'div'} variant="subtitle1" className={classes.leftText}>
          Enter requisition bonus
        </Typography>
        <Typography component={'div'} variant="subtitle2" className={classes.leftText}>
          (optional)
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Box className={classes.box}>
          <ReqBonusAmountInput />
          <ReqBonusTypeSelect />
        </Box>
      </Grid>
    </Grid>
  );
};

export default RequisitionSpend;
