import React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import OktaSignInWidget from "./OktaSignInWidget";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "5rem",
    "@media (max-width: 767px)": {
      height: "70vh",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  containerOne: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  brandImg: {
    width: "300px",
    marginLeft: "-3.75rem",
    marginBottom: "-2rem",
    "@media (max-width: 767px)": {
      width: "120px",
      marginLeft: "-1.4rem",
      marginBottom: "-1rem",
    },
  },
  brandText: {
    fontSize: "8rem",
    "@media (max-width: 767px)": {
      fontSize: "3rem",
    },
  },
  alert: {
    "@media (min-width: 767px)": {
      display: "none",
    },
  },
  containerTwo: {
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
}));

const LogInPage = () => {
  const classes = useStyles();

  return (
    <>
      <Alert severity="error" className={classes.alert}>
        LPSync is only available on desktop
      </Alert>
      <Container className={classes.root}>
        <div className={classes.containerOne}>
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
        <div className={classes.containerTwo}>
          <OktaSignInWidget />
        </div>
      </Container>
    </>
  );
};

export default LogInPage;
