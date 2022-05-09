import React, {memo} from "react";
import {Box, makeStyles, Paper} from "@material-ui/core";
import RequestInfoBoxItem from "./RequestInfoBoxItem";

const useStyles = makeStyles((theme) => ({
  infoPaper: {
    backgroundColor: theme.palette.info.dark,
    display: "flex",
    flexDirection: "column",
    padding: "1em 0.75em",
    borderRadius: "5px",
    justifyContent: "center",
    minWidth: "460px",
    height: "auto",
    minHeight: "135px",
  },
}));

const RequestInfoBox = () => {
  const classes = useStyles();
  return (
    <Box pb={1} sx={{display: "flex"}}>
      <Paper elevation={3} className={classes.infoPaper}>
        <RequestInfoBoxItem
          number="1"
          label="Request a requisition"
          question="Do I need to do this?"
          description={
            "Before you can onboard a candidate, a requisition must be created and approved. " +
            "A requisition is requesting the finance for a new candidate (employee/partner/contractor)."
          }
        />

        <RequestInfoBoxItem
          number="2"
          label="Request a candidate"
          question="When can I do this?"
          description={
            "You can only do this once a requisition has been created and approved. " +
            "By requesting a candidate, the login details for the candidate will be sent to the candidate email address."
          }
        />
      </Paper>
    </Box>
  );
};

export default memo(RequestInfoBox);
