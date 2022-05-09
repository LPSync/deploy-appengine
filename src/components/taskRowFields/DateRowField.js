import React, {memo} from "react";
import {getDateString, getShortDateWithTimeString} from "../../data/helper/DateTimezoneHelpers";
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  requestDateTime: {
    fontSize: ".8rem",
  },
}));

const DateRowField = ({dateTime, date}) => {
  const classes = useStyles();
  return (
    <Typography component="div" className={classes.requestDateTime}>
      {dateTime && getShortDateWithTimeString(dateTime)}
      {date && getDateString(date)}
    </Typography>
  );
};

export default memo(DateRowField);