import React, {memo} from "react";
import CreatedDateRowField from "../../../components/taskRowFields/DateRowField";
import TaskDetailsRowField from "../../../components/taskRowFields/TaskDetailsRowField";
import TaskStatusRowField from "../../../components/taskRowFields/TaskStatusRowField";
import ViewTaskButton from "../../../components/buttons/ViewButton";
import {useHistory, useRouteMatch} from "react-router-dom";
import CustomTableRow from "../../../components/table/CustomTableRow";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import TableContent from "../../../components/table/TableContent";

const headCells = [
  {id: "id", label: "Task ID"},
  {id: "taskCreatedDateTime", label: "Requested Date"},
  {id: "taskCreatorUsername", label: "Requested By"},
  {id: "taskType", label: "Task Type", isNotSortable: true},
  {id: "TaskDetails", label: "Task Details", isNotSortable: true},
  {id: "taskStatus", label: "Task Status"},
];

const getCreatorName = (task) =>
  task?.taskCreatorFirstName && task?.taskCreatorFirstName !== "-"
    ? `${task.taskCreatorFirstName} ${task.taskCreatorLastName}`
    : task.taskCreatorUsername;

export const taskManagerRow = (task) => [
  {id: "id", value: task?.id},
  {
    id: "taskCreatedDateTime",
    value: <CreatedDateRowField dateTime={task?.taskCreatedDateTime} />,
  },
  {id: "taskCreatorUsername", value: getCreatorName(task)},
  {
    id: "taskType",
    value:
      task?.taskType === "badge-request" ? "badge request" : task?.taskType,
  },
  {id: "taskDetails", value: <TaskDetailsRowField task={task} />},
  {id: "taskStatus", value: <TaskStatusRowField task={task} />},
  {id: "view", value: <ViewTaskButton />},
];

const TaskTableRow = (task) => {
  const history = useHistory();
  const match = useRouteMatch(FrontendRoutes.TASK_MANAGER_VIEW());
  const matchTaskManager = useRouteMatch(FrontendRoutes.TASK_MANAGER);

  const handleOnSelectedTask = (taskId) => {
    if ((match?.params?.hash || matchTaskManager.isExact) && taskId) {
      history.push(
        FrontendRoutes.TASK_MANAGER_VIEW_TASK(
          match?.params?.hash || "mytasks",
          taskId
        )
      );
    }
  };

  return (
    <CustomTableRow
      key={task?.id}
      id={task?.id}
      rowData={taskManagerRow(task)}
      handleClick={() => handleOnSelectedTask(task?.id)}
    />
  );
};

const TaskManagerTableContent = ({data, isLoading}) => {
  return (
    <TableContent
      initOrderBy="taskCreatedDateTime"
      headCells={headCells}
      data={data}
      isLoading={isLoading}
      tableRow={TaskTableRow}
    />
  );
};

export default memo(TaskManagerTableContent);
