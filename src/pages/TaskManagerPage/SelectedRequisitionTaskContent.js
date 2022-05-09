import React, {memo, useContext} from "react";
import {Divider} from "@material-ui/core";
import {AuthUserContext} from "../../AuthUserContextProvider";
import TaskStatuses from "../../data/constants/TaskStatuses";
import TaskStatusBlock from "../../components/taskManager/TaskStatusBlock";
import {requisitionTaskRows} from "./SelectedTasks/SelectedRequisitionTaskData";
import TaskSection from "./SelectedTasks/components/TaskSection";
import RequisitionActionsSection from "./SelectedTasks/SelectedRequisitionActionsSection";
import {connect} from "react-redux";
import TaskTimeline from "./SelectedTasks/components/TaskTimeline";

const SelectedRequisitionTaskContent = ({
  onSubmitted,
  selectedTaskData,
  handleClose,
}) => {
  const {authUser, permRequisitionApproveTasks, permRequisitionRejectTasks} =
    useContext(AuthUserContext);

  const checkSelfCreatedTask = (data, user) => {
    const taskUsername = data?.taskCreatorUsername;
    const username = user?.profile?.userName;
    if (!username || !taskUsername) return false;
    return taskUsername === username;
  };

  const taskActionPermissions =
    (permRequisitionApproveTasks || permRequisitionRejectTasks) &&
    selectedTaskData?.taskStatus === TaskStatuses.PENDING;
  const selfTaskActionPermissions =
    checkSelfCreatedTask(selectedTaskData, authUser) &&
    (selectedTaskData?.taskStatus === TaskStatuses.PENDING ||
      selectedTaskData?.taskStatus === TaskStatuses.COMPLETE);

  return (
    <>
      <TaskSection
        title="Requisition Task Details"
        statusBlock={
          <TaskStatusBlock
            taskStatus={selectedTaskData?.taskStatus}
            id={selectedTaskData?.id}
          />
        }
        tableRows={requisitionTaskRows(selectedTaskData)}
      >
        <Divider />
      </TaskSection>
      {(taskActionPermissions || selfTaskActionPermissions) && (
        <RequisitionActionsSection
          onSubmitted={onSubmitted}
          handleClose={handleClose}
          selfCreatedTask={selfTaskActionPermissions}
        />
      )}
      <TaskTimeline taskData={selectedTaskData} />
    </>
  );
};

export default connect(
  (state) => ({selectedTaskData: state.taskManager.get("selectedTaskData")}),
  {}
)(memo(SelectedRequisitionTaskContent));
