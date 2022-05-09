import React from "react";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import ContractMonthsInput from "./ContractMonthsInput";
import ContractHoursInput from "./ContractHoursInput";

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

const ContractInformation = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <Typography component={'div'} variant="subtitle1" className={classes.leftText}>
            Enter contract length
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box className={classes.box}>
            <ContractMonthsInput />
            <ContractHoursInput />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ContractInformation;
