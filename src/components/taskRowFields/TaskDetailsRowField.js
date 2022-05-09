import React, { memo, useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import TaskTypes from "../../data/constants/TaskTypes";
import TaskScheduleTypes from "../../data/constants/TaskScheduleTypes";
import {
  getOffboardingFullName,
  getOnboardingFullName,
  transformDashToSpace,
} from "../../data/helper/helpers";
import { getDateString, getDateWithTimeString } from "../../data/helper/DateTimezoneHelpers";

const useStyles = makeStyles(() => ({
  tinyFontSize: {
    fontSize: ".7rem",
  },
  tinyBoldFontSize: {
    fontWeight: 600,
    fontSize: ".7rem",
  },
  title: {
    fontWeight: 600,
  },
}));

const getImmediateText = taskEndDate => {
  return <>
    Immediate
    {taskEndDate && <>; completed on <br /> {getDateWithTimeString(taskEndDate)}</>}
  </>;
};

const getScheduleText = (taskScheduleDateTime, taskScheduleTimezone) => {
  return <>
    Scheduled for <br /> {taskScheduleTimezone
    ? getDateWithTimeString(taskScheduleDateTime, taskScheduleTimezone)
    : getDateString(taskScheduleDateTime)
  }</>;
};

const isScheduled = taskScheduleType => taskScheduleType === TaskScheduleTypes.SCHEDULED;

const getTaskDetails = task => {
  switch (task.taskType) {
    case TaskTypes.OFFBOARDING:
      return {
        title: task?.offboardingTask ? getOffboardingFullName(task) : "Unknown User",
        description: isScheduled(task?.taskScheduleType)
            ? getScheduleText(task?.taskScheduleDateTime, task?.taskScheduleTimezone)
            : getImmediateText(task?.taskEndDate),
      };
    case TaskTypes.ONBOARDING:
      return {
        title: task?.onboardingTask && getOnboardingFullName(task),
        description: isScheduled(task?.taskScheduleType)
          ? getScheduleText(task?.taskScheduleDateTime)
          : getImmediateText(task?.taskEndDate),
      };
    case TaskTypes.REQUISITION:
      return {
        title: task.requisitionTask?.reqType,
        description: <>
          Planned start date: <br /> {getDateString(task.requisitionTask?.reqStartDate)}
        </>,
      };
    case TaskTypes.BADGE_REQUEST:
      return {
        title: task.badgeRequestTask?.badgeRequestName,
        description: <>
          Badge category: <br /> {transformDashToSpace(task.badgeRequestTask?.badgeRequestType)}
        </>,
      };
    default:
      return { title: "", description: "" };
  }
};

const TaskDetailsRowField = ({ task }) => {
  const classes = useStyles();
  const details = useMemo(() => getTaskDetails(task), [task.id]);//, [task]);

  return (
    <>
      <div className={classes.title}>
        {details?.title || ""}
      </div>

      <div className={classes.tinyFontSize}>
        {details?.description || ""}
      </div>
    </>
  );
};

export default memo(TaskDetailsRowField);
