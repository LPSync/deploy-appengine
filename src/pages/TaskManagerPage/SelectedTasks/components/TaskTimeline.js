import React, {memo, useMemo} from "react";
import {Divider, makeStyles} from "@material-ui/core";
import {Timeline} from "@material-ui/lab";
import CustomTimelineItem from "./CustomTimelineItem";
import TaskStatuses from "../../../../data/constants/TaskStatuses";
import {getDateWithTimeString} from "../../../../data/helper/DateTimezoneHelpers";
import {getStrWithFirstUpperLetter } from "../../../../data/helper/helpers";
import DoneIcon from "@material-ui/icons/DoneOutlined";
import DescriptionIcon from "@material-ui/icons/DescriptionTwoTone";
import CheckIcon from "@material-ui/icons/CheckCircleOutlineTwoTone";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import EmailIcon from "@material-ui/icons/EmailTwoTone";
import ApprovalStatuses from "../../../../data/constants/ApprovalStatuses";
import TaskSection from "./TaskSection";
import UserProfileLink from "../../../../components/UserProfileLink";

const useStyles = makeStyles(() => ({
  statusCancelled: {
    backgroundColor: "#ca2929",
  },
  statusComplete: {
    backgroundColor: "#4bc191",
  },
  statusSigned: {
    backgroundColor: "#2ba8d5",
  },
  statusApproved: {
    backgroundColor: "#ff6900",
  },
  statusRequested: {
    backgroundColor: "#df60a2",
  },
}));

const TaskTimeline = ({ taskData, isOffboarding }) => {
  const classes = useStyles();

  const items = useMemo(() =>
      taskData && getTimeLineItems(taskData, isOffboarding, classes),
    [taskData, isOffboarding, classes],
  );

  return (
    <TaskSection title="Task Timeline">
      <Timeline align="alternate">
        {items?.map((item, index) => (
          <CustomTimelineItem key={index} item={item} isLast={index === items.length - 1} />
        ))}
      </Timeline>
      <Divider />
    </TaskSection>
  );
};

const getTimeLineItems = (taskData, isOffboarding, classes) => {
  const {
    taskEndDate,
    taskStatus,
    taskApprovals,
    taskCreatorUsername,
    taskCreatorFirstName,
    taskCreatorLastName,
    taskCreatedDateTime,
    taskType,
  } = taskData || {};

  const creatorName = (taskCreatorFirstName || "") + " " + (taskCreatorLastName || "");
  if (!taskData) {
    return null;
  }
  return [
    (taskEndDate && taskStatus === TaskStatuses.COMPLETE) && {
      id: "competedOn",
      title: `${taskType && (getStrWithFirstUpperLetter(taskType))} complete`,
      date: getDateWithTimeString(taskEndDate),
      icon: <DoneIcon fontSize="small" />,
      dotClasses: classes.statusComplete,
    },
    (taskEndDate && taskStatus === TaskStatuses.FAILED) && {
      id: "failedOn",
      title: `${taskType && (getStrWithFirstUpperLetter(taskType))} failed`,
      date: getDateWithTimeString(taskEndDate),
      icon: <CancelOutlinedIcon fontSize="small" />,
      dotClasses: classes.statusCancelled,
    },
    ...taskApprovals?.map((approval) => {
      const { approvalStatus, approvalUsername, approvalFirstName, approvalLastName, approvalEmail, approvalDateTime }
        = approval || {};

      const approvalName = (approvalFirstName || "") + " " + (approvalLastName || "");
      const email = (approvalEmail || (approvalUsername?.includes("@") && approvalUsername));// FIXME remove check when update db
      const dotOptions = getDotTaskOptions(approvalStatus, classes, email);

      return {
        id: approval?.id,
        date: getDateWithTimeString(approvalDateTime),
        name: (approvalUsername && !approvalUsername.includes("@")) // FIXME remove check when update db
          ? <UserProfileLink name={approvalName} username={approvalUsername} />
          : approvalName,
        title: getTaskApprovalStatusTitle(approvalStatus),
        ...dotOptions,
      };
    }),
    {
      id: "requestedBy",
      title: "Requested by",
      name: taskCreatorUsername ? <UserProfileLink name={creatorName} username={taskCreatorUsername} /> : creatorName,
      date: getDateWithTimeString(taskCreatedDateTime),
      icon: <InfoIcon fontSize="small" />,
      dotClasses: classes.statusRequested,
    }].filter(i => !!i);
};

const getTaskApprovalStatusTitle = (approvalStatus) => {
  switch (approvalStatus) {
    case ApprovalStatuses.CANDIDATE_PORTAL_EMAIL_SENT:
      return "Candidate Portal Email sent to";
    case ApprovalStatuses.REMAINDER_EMAIL_SENT:
      return "Candidate Tasks Not Complete Reminder sent to";
    case ApprovalStatuses.NEW_HIRE_EMAIL_SENT:
      return "New Hire Email with Login Details sent to";

    case ApprovalStatuses.SIGNED_ACCEPTABLE:
      return "Acceptable Use Form Task signed and completed by";
    case ApprovalStatuses.SIGNED_SECURITY:
      return "Security Form Task signed and completed by";
    case ApprovalStatuses.SIGNED_VENDOR:
      return "Vendor Form Task signed and completed by";

    default:
      return `${getStrWithFirstUpperLetter(approvalStatus)} by`;
  }
};

const getDotTaskOptions = (approvalStatus, classes, approvalEmail) => {
  switch (approvalStatus) {
    case ApprovalStatuses.APPROVED:
      return { icon: <ThumbUpIcon fontSize="small" />, dotClasses: classes.statusApproved };

    case ApprovalStatuses.REJECTED:
    case ApprovalStatuses.CANCELLED:
    case ApprovalStatuses.EXPIRED:
      return {
        icon: <CancelOutlinedIcon fontSize="small" />,
        dotClasses: classes.statusCancelled,
      };

    case ApprovalStatuses.SIGNED_ACCEPTABLE:
    case ApprovalStatuses.SIGNED_SECURITY:
    case ApprovalStatuses.SIGNED_VENDOR:
      return { icon: <DescriptionIcon fontSize="small" />, dotClasses: classes.statusSigned };

    case ApprovalStatuses.COMPLETE_SIGNING:
      return { icon: <CheckIcon fontSize="small" />, dotClasses: classes.statusSigned };

    case ApprovalStatuses.REMAINDER_EMAIL_SENT:
    case ApprovalStatuses.NEW_HIRE_EMAIL_SENT:
    case ApprovalStatuses.CANDIDATE_PORTAL_EMAIL_SENT:
      return { icon: <EmailIcon fontSize="small" />, dotClasses: "", name: approvalEmail };

    default:
      return { icon: <InfoIcon fontSize="small" />, dotClasses: "" };
  }
};

export default memo(TaskTimeline);
