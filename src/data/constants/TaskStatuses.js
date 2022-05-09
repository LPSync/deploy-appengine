import FteTrackerStatuses from "./FteTrackerStatuses";
import {TierStatuses} from "./ServiceAndSystemDirectory";

export const getTaskStatusText = (taskStatus) => {
  switch (taskStatus) {
    case TaskStatuses.PENDING:
      return "Pending Approval";
    case TaskStatuses.PENDING_USER_TASKS:
      return "Pending User Tasks";
    case TaskStatuses.READY:
      return "Scheduled";
    case TaskStatuses.RUNNING:
      return "In Progress";
    case TaskStatuses.COMPLETE:
      return "Complete";
    case TaskStatuses.CANCELLED:
      return "Canceled";
    case TaskStatuses.FAILED:
      return "Failed";
    case TaskStatuses.EXPIRED:
      return "Expired";
    case FteTrackerStatuses.NEW:
      return "New";
    case FteTrackerStatuses.DISPATCH_NOW:
      return "Dispatch Now";
    case FteTrackerStatuses.SHIPPED:
      return "Shipped";
    case TierStatuses.One:
      return "Tier 1";
    case TierStatuses.Two:
      return "Tier 2";
    case TierStatuses.Three:
      return "Tier 3";
    case TierStatuses.Four:
      return "Tier 4";
    default:
      return "";
  }
};

const TaskStatuses = {
  PENDING: "pending",
  PENDING_USER_TASKS: "pending_user_tasks",
  READY: "ready",
  RUNNING: "running",
  COMPLETE: "complete",
  CANCELLED: "cancelled",
  FAILED: "failed",
  EXPIRED: "expired",
};

export default TaskStatuses;
