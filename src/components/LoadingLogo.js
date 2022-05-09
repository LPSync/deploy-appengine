import React, { useState, useEffect, memo } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  landingLogoText: {
    paddingTop: 20,
    width: "100%",
    textAlign: "center"
  },
  landingLogo: {
    width: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const LoadingLogo = () => {
  const classes = useStyles();
  const [viewErrorMsg, setViewErrorMsg] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setViewErrorMsg(true);
    }, 15000);
  }, []);

  return (
    <div className={classes.landingLogo}>
      <CircularProgress color="secondary" size={80}/>
      <div className={classes.landingLogoText}>
        {viewErrorMsg ? (
          <strong>Error loading users... please refresh the page</strong>
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </div>
  );
};

export default memo(LoadingLogo);
