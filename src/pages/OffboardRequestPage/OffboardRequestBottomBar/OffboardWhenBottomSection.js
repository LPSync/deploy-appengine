import React, {memo} from "react";
import dateFormat from "dateformat";
import {Grid, Typography} from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import TaskScheduleTypes from "../../../data/constants/TaskScheduleTypes";
import BottomSectionTitle from "./BottomSectionTitle";
import BottomSectionWrapper from "./BottomSectionWrapper";
import { useSelector, shallowEqual } from "react-redux";
import { getOffboardingRequestObject } from "../OffboardRequestPageContent";

const OffboardWhenBottomSection = () => {
  const taskScheduling = useSelector(getOffboardingRequestObject("taskScheduling"), shallowEqual);

  const { scheduleType, scheduleDate, scheduleTimeZone } = taskScheduling || {};
  return (
    <BottomSectionWrapper xs={2}>
      <BottomSectionTitle title={"Offboard When"}>
        <QueryBuilderIcon />
      </BottomSectionTitle>
      <Grid item>
        <Typography variant={"body2"}>
          <strong>{scheduleType}</strong>
        </Typography>
        {(scheduleType === TaskScheduleTypes.SCHEDULED ||
          scheduleType === TaskScheduleTypes.SENSITIVE) && (
          <>
            <Typography variant={"subtitle2"}>
              {dateFormat(scheduleDate, "mmmm d, yyyy h:MM TT")}
            </Typography>
            <Typography variant={"subtitle2"}>{scheduleTimeZone}</Typography>
          </>
        )}
      </Grid>
    </BottomSectionWrapper>
  );
};

export default memo(OffboardWhenBottomSection);
