import {
  Box,
  Button,
  Card,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, {memo, useCallback} from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.secondary.light,
    padding: "1em",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5em",
  },
}));

const RequisitionCardItem = ({title, value}) => {
  return (
    <Grid item xs={6}>
      <Typography
        component={"div"}
        variant="subtitle2"
        style={{paddingBottom: "0.25em"}}
      >
        {title}: {value}
      </Typography>
    </Grid>
  );
};

const RequisitionCard = ({handleSelect, requisition, children, ...props}) => {
  const classes = useStyles();

  const {
    id,
    hiringManagerFirstName,
    hiringManagerLastName,
    hiringManagerEmail,
    businessUnit,
    department,
    locationDescription,
    jobTitle,
    bonusAmount,
    bonusType,
    jobCode,
    salary,
    salaryCurrency,
    salaryPeriod,
    isBackfill,
    backfillFirstName,
    backfillLastName,
  } = requisition || {};
  const backfillTitlePart = isBackfill
    ? " (Backfill for: " + backfillFirstName + " " + backfillLastName + ")"
    : "";
  const title =
    "Req ID: " + id + " — " + jobCode + " | " + jobTitle + backfillTitlePart;

  const onSelect = useCallback(() => {
    handleSelect(requisition);
  }, [requisition, handleSelect]);

  return (
    <Card className={classes.card} {...props}>
      <Box>
        {requisition ? (
          <>
            <Typography component={"div"} variant="subtitle1">
              {title}
            </Typography>

            <Grid container>
              <RequisitionCardItem
                title="Hiring Manager"
                value={
                  (hiringManagerFirstName || "") +
                  " " +
                  (hiringManagerLastName || "") +
                  " | " +
                  (hiringManagerEmail || "")
                }
              />
              <RequisitionCardItem title="Business Unit" value={businessUnit} />

              <RequisitionCardItem
                title="Location"
                value={locationDescription}
              />
              <RequisitionCardItem title="Department" value={department} />

              <RequisitionCardItem
                title="Salary"
                value={[
                  salary || "",
                  salaryCurrency || "",
                  salaryPeriod || "",
                ].join(" ")}
              />
              <RequisitionCardItem
                title="Bonus"
                value={
                  bonusAmount
                    ? (bonusAmount || "") + " " + (bonusType || "")
                    : "n/a"
                }
              />
            </Grid>
          </>
        ) : (
          children
        )}
      </Box>

      <Button
        size="small"
        onClick={onSelect}
        color="secondary"
        variant="outlined"
        style={{height: 40}}
      >
        Select
      </Button>
    </Card>
  );
};

export default memo(RequisitionCard);
