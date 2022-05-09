import React, { useContext } from "react";
import { Box, makeStyles, Typography, } from "@material-ui/core";
import { NonFteAuditReportContext } from "../NonFteAuditReportContextProvider";

const useStyles = makeStyles((theme) => ({
  countContainer: { width: "100%", display: "flex", flexDirection: "row" },
  countBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  line: {
    borderRight: "2px solid #87889c",
    marginRight: theme.spacing(2),
  },
  viewBox: {
    border: "1px solid #87889c",
    borderRadius: "5px",
  },
  countNum: {
    fontSize: "2rem",
  },
  countNumTitle: {
    fontSize: ".9rem",
  },
}));

const NonFteCountBox = () => {
  const classes = useStyles();
  const {
    nonFteTotal,
    offboardingRequiredTotal,
    employeeTypeIncorrectTotal,
    directReportKnownTotal,
    directReportUnknownTotal,
    directReportCorrectTotal,
  } = useContext(NonFteAuditReportContext);

  return (
    <Box className={classes.countContainer}>
      <Box className={classes.countBox}>
        <div>
          <Typography component={'div'} className={classes.countNum}>{nonFteTotal}</Typography>
        </div>

        <div>
          <Typography component={'div'} className={classes.countNumTitle}>
            Total Non-FTEs
          </Typography>
        </div>
      </Box>
      <Box className={classes.line} />
      <Box className={classes.countBox}>
        <div>
          <Typography component={'div'} className={classes.countNum}>
            {nonFteTotal -
              (offboardingRequiredTotal +
                directReportCorrectTotal +
                employeeTypeIncorrectTotal +
                directReportKnownTotal +
                directReportUnknownTotal)}
          </Typography>
        </div>

        <div>
          <Typography component={'div'} className={classes.countNumTitle}>Not Audited</Typography>
        </div>
      </Box>
      <Box className={classes.line} />
      <Box className={classes.countBox}>
        <div>
          <Typography component={'div'} className={classes.countNum}>
            {offboardingRequiredTotal}
          </Typography>
        </div>

        <div>
          <Typography component={'div'} className={classes.countNumTitle}>
            Offboarding Required
          </Typography>
        </div>
      </Box>
      <Box className={classes.line} />
      <Box className={classes.countBox}>
        <div>
          <Typography component={'div'} className={classes.countNum}>
            {employeeTypeIncorrectTotal}
          </Typography>
        </div>
        <div>
          <Typography component={'div'} className={classes.countNumTitle}>
            Employee Type Incorrect
          </Typography>
        </div>
      </Box>
      <Box className={classes.line} />
      <Box className={classes.countBox}>
        <div>
          <Typography component={'div'} className={classes.countNum}>
            {directReportKnownTotal}
          </Typography>
        </div>
        <div>
          <Typography component={'div'} className={classes.countNumTitle}>
            Direct Report Known
          </Typography>
        </div>
      </Box>
      <Box className={classes.line} />
      <Box className={classes.countBox}>
        <div>
          <Typography component={'div'} className={classes.countNum}>
            {directReportUnknownTotal}
          </Typography>
        </div>
        <div>
          <Typography component={'div'} className={classes.countNumTitle}>
            Direct Report Unknown
          </Typography>
        </div>
      </Box>
      <Box className={classes.line} />
      <Box className={classes.countBox}>
        <div>
          <Typography component={'div'} className={classes.countNum}>
            {directReportCorrectTotal}
          </Typography>
        </div>
        <div>
          <Typography component={'div'} className={classes.countNumTitle}>
            Direct Report Correct
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default NonFteCountBox;
