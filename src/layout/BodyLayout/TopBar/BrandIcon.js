import React, {memo} from "react";
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  brandImg: {
    width: "115px",
  },
  brandText: {
    fontSize: "1.75rem",
    lineHeight: "1rem",
    marginLeft: "1.57rem",
  },
}));

const BrandIcon = () => {
  const classes = useStyles();
  return (
    <Box>
      <img
        src="/images/black_lp_logo_300.png"
        alt="small-liveperson-logo"
        className={classes.brandImg}
      />
      <p className={classes.brandText}>
        <span style={{fontWeight: "bold"}}>LP</span>
        SYNC
      </p>
    </Box>
  );
};

export default memo(BrandIcon);
