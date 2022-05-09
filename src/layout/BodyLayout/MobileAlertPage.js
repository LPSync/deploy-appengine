import React from "react";
import { Container, Typography, makeStyles, Box } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(() => ({
  root: {
    height: "70vh",
    flexDirection: "column",
    justifyContent: "center",
  },
  logoDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  brandImg: {
    width: "120px",
    marginLeft: "-1.4rem",
    marginBottom: "-1rem",
  },
  brandText: {
    fontSize: "3rem",
  },
}));

const MobileAlertPage = () => {
  const classes = useStyles();

  return (
    <>
      <Box mt={5}>
        <Alert severity="error" className={classes.alert}>
          LPSync is only available on desktop
        </Alert>
      </Box>
      <Container className={classes.root}>
        <div className={classes.logoDiv}>
          <div>
            <img
              src="https://storage.googleapis.com/lpsync/orange_lp_logo.png"
              alt="small-liveperson-logo"
              className={classes.brandImg}
            />
            <Typography
              component={"div"}
              variant="h1"
              className={classes.brandText}
            >
              <span style={{ fontWeight: "bold" }}>LP</span>
              <span style={{ fontWeight: "300" }}>SYNC</span>
            </Typography>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MobileAlertPage;
