import React, {memo, useContext} from "react";
import {Divider} from "@material-ui/core";
import {AuthUserContext} from "../../AuthUserContextProvider";
import TaskStatuses from "../../data/constants/TaskStatuses";
import TaskStatusBlock from "../../components/taskManager/TaskStatusBlock";
import TaskSection from "./SelectedTasks/components/TaskSection";
import {connect} from "react-redux";
import TaskTimeline from "./SelectedTasks/components/TaskTimeline";
import {badgeRequestTaskRows} from "./SelectedTasks/SelectedBadgeRequestTaskData";
import SelectedBadgeRequestActionsSection from "./SelectedTasks/SelectedBadgeRequestActionsSection";

const SelectedBadgeRequestTaskContent = ({
  onSubmitted,
  selectedTaskData,
  handleClose,
}) => {
  const {permBadgeRequestApproveTasks, permBadgeRequestRejectTasks} =
    useContext(AuthUserContext);

  const taskActionPermissions =
    (permBadgeRequestApproveTasks || permBadgeRequestRejectTasks) &&
    selectedTaskData?.taskStatus === TaskStatuses.PENDING;

  return (
    <>
      <TaskSection
        title="Badge Request Task Details"
        statusBlock={
          <TaskStatusBlock
            taskStatus={selectedTaskData?.taskStatus}
            id={selectedTaskData?.id}
          />
        }
        tableRows={badgeRequestTaskRows(selectedTaskData)}
      >
        <Divider />
      </TaskSection>
      {taskActionPermissions && (
        <SelectedBadgeRequestActionsSection
          onSubmitted={onSubmitted}
          handleClose={handleClose}
        />
      )}
      <TaskTimeline taskData={selectedTaskData} />
    </>
  );
};

export default connect(
  (state) => ({selectedTaskData: state.taskManager.get("selectedTaskData")}),
  {}
)(memo(SelectedBadgeRequestTaskContent));
