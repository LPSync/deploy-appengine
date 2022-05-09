import React, {memo} from "react";
import {Box, Divider, Grid, makeStyles} from "@material-ui/core";
import OffboardWhoBottomSection from "./OffboardWhoBottomSection";
import OffboardWhenBottomSection from "./OffboardWhenBottomSection";
import DataTransferBottomSection from "./DataTransferBottomSection";
import LicensesDevicesBottomSection from "./LicensesDevicesBottomSection";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2),
    margin: theme.spacing(0, 2),
    flexShrink: 0,
  },
  box: {
    backgroundColor: theme.palette.secondary.light,
  },
  divider: {
    background: theme.palette.background.dark,
  },
}));

const OffboardRequestBottomBar = ({children}) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Divider className={classes.divider} />
      <Box className={classes.box} mt={1}>
        <Grid container direction="row" spacing={2}>
          <OffboardWhoBottomSection />

          <OffboardWhenBottomSection />

          <DataTransferBottomSection />

          <LicensesDevicesBottomSection />

          <Grid item xs={2}>
            <Box mt={4}>{children}</Box>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default memo(OffboardRequestBottomBar);
