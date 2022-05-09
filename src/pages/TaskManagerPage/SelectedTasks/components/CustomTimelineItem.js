import React, {memo} from "react";
import {
  TimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
  TimelineOppositeContent,
} from "@material-ui/lab";
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  "@global": {
    ".MuiTimelineItem-alignAlternate:nth-child(even)": {
      flexDirection: "row",
    },
    ".MuiTimelineItem-alignAlternate:nth-child(even) .MuiTimelineItem-content":
      {
        textAlign: "left",
      },
    ".MuiTimelineItem-alignAlternate:nth-child(even) .MuiTimelineItem-oppositeContent":
      {
        textAlign: "right",
      },
  },
  timelineRoot: {
    minHeight: 80,
  },
  timelineDate: {
    fontSize: "0.75rem",
  },
  timelineTime: {
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
  timelineTitle: {
    fontSize: "0.875rem",
  },
  timelineName: {
    fontSize: "1rem",
  },
  timelineOppositeContent: {
    maxWidth: 200,
    paddingTop: 8,
  },
  alignCenter: {
    maxWidth: "auto",
    paddingTop: 8,
  },
  timelineContent: {
    maxWidth: 450,
    paddingTop: (props) => (props.name ? 4 : 16),
  },
}));

const CustomTimelineItem = ({item, isLast, alignCenter}) => {
  const {date, icon, name, title, dotClasses, time} = item || {};
  const classes = useStyles({name});

  return (
    <TimelineItem className={classes.timelineRoot}>
      <TimelineOppositeContent
        className={
          alignCenter ? classes.alignCenter : classes.timelineOppositeContent
        }
      >
        {date && (
          <Typography color="textSecondary" className={classes.timelineDate}>
            {date}
          </Typography>
        )}
        {time && (
          <Typography color="textSecondary" className={classes.timelineTime}>
            {time}
          </Typography>
        )}
      </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineDot color="secondary" className={dotClasses}>
          {icon}
        </TimelineDot>
        {!isLast && <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent className={classes.timelineContent}>
        {title && (
          <Typography color="textSecondary" className={classes.timelineTitle}>
            {title}
          </Typography>
        )}
        {name && (
          <Typography variant="h6" className={classes.timelineName}>
            {name}
          </Typography>
        )}
      </TimelineContent>
    </TimelineItem>
  );
};

export default memo(CustomTimelineItem);
