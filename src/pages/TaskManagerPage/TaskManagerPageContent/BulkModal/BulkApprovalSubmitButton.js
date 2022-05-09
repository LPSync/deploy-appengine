import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { getTaskFieldValue, getTaskFullName, logOptions, trailingS } from "../../../../data/helper/helpers";
import ApprovalStatuses from "../../../../data/constants/ApprovalStatuses";
import TaskStatuses from "../../../../data/constants/TaskStatuses";
import TaskTypes from "../../../../data/constants/TaskTypes";
import { useMutation } from "@apollo/client";
import { ADD_TASK_APPROVAL } from "../../../../operations/mutations/addTaskApproval";
import handleError from "../../../../data/handleError";
import { CREATE_LOG_ENTRY } from "../../../../operations/mutations/createLogEntry";
import { useHistory } from "react-router-dom";
import { AuthUserContext } from "../../../../AuthUserContextProvider";

const getTaskStatus = (taskType, employeeType) => {
  if (taskType === TaskTypes.ONBOARDING) {
    return employeeType === "Full Time"
      ? TaskStatuses.READY
      : TaskStatuses.PENDING_USER_TASKS;
  }
  if (taskType === TaskTypes.REQUISITION) {
    return TaskStatuses.COMPLETE;
  }
  if (taskType === TaskTypes.OFFBOARDING) {
    return TaskStatuses.READY;
  }
};

const createLogDescription = (taskData, operation, taskType, info) => {
  if (taskType === TaskTypes.REQUISITION) {
    return (
      `Task ${operation} >> Task ID: ${taskData.id} ` +
      `[${getTaskFieldValue(taskData, taskType, "Type")}, ` +
      `${getTaskFieldValue(taskData, taskType, "BusinessUnit")}, ` +
      `${getTaskFieldValue(taskData, taskType, "Department")}]; ` +
      `${info}`
    );
  }
  if (taskType === TaskTypes.ONBOARDING || taskType === TaskTypes.OFFBOARDING) {
    return (
      `Task ${operation} >> Task ID: ${taskData.id} ` +
      `[${getTaskFullName(taskData, taskType)} ` +
      `(${getTaskFieldValue(taskData, taskType, "Username")})]; ` +
      `${info}`
    );
  }
};

const BulkApprovalSubmitButton = ({ taskIds, tasks, handleSubmitClose }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const length = useMemo(() => taskIds?.length, [taskIds]);
  const [approvedAmount, setApprovedAmount] = useState(0);

  const { authUser } = useContext(AuthUserContext);

  const [addTaskApproval] = useMutation(ADD_TASK_APPROVAL, {
    onCompleted: () => setApprovedAmount(amount => amount + 1),
    onError: (error) => {
      setApprovedAmount(amount => amount + 1);
      handleError(error)(history);
    },
  });

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const addApproval = (id, taskType, taskStatus, taskApprovalStatus, input) => {
    addTaskApproval({
      variables: { id, taskType, taskStatus, taskApprovalStatus, input },
    });
  };

  const createLog = (description) => {
    createLogEntry(logOptions(description));
  };

  const handleSubmit = () => {
    setLoading(true);
    const selectedTasks = tasks?.filter(task => taskIds?.includes(task?.id));
    selectedTasks?.map(taskData => {
      const approvalStatus = ApprovalStatuses.APPROVED;
      const approvalInfo = {
        approvalStage: 1,
        approvalStatus,
      };
      const taskType = taskData.taskType;
      const taskStatus = getTaskStatus(taskType, taskData?.onboardingTask?.onboardEmployeeType);
      addApproval(
        parseInt(taskData?.id),
        taskType,
        taskStatus,
        approvalStatus,
        approvalInfo,
      );
      createLog(
        createLogDescription(taskData,
          "Approved",
          taskType,
          `approvedBy: ${authUser.profile.userName};`,
        ),
      );
    });
  };

  useEffect(() => {
    if (length && length === approvedAmount) {
      setLoading(false);
      setApprovedAmount(0);
      handleSubmitClose();
    }
  }, [length, approvedAmount]);

  if (!length) {
    return null;
  }
  return (
    <Box mx={2} mt={2}>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => !loading && handleSubmit()}
      >
        {loading && <CircularProgress size={20} color="inherit" style={{ marginRight: 4 }} />}
        Approve selected ({length} Task{trailingS(length)})
      </Button>
    </Box>
  );
};

export default memo(BulkApprovalSubmitButton);