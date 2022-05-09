import React, {memo, useContext} from "react";
import {Divider} from "@material-ui/core";
import {AuthUserContext} from "../../AuthUserContextProvider";
import TaskStatuses from "../../data/constants/TaskStatuses";
import TaskStatusBlock from "../../components/taskManager/TaskStatusBlock";
import TaskSection from "./SelectedTasks/components/TaskSection";
import {onboardTaskRows} from "./SelectedTasks/SelectedOnboardTaskData";
import OnboardActionSection from "./SelectedTasks/SelectedOnboardActionSection";
import {connect} from "react-redux";
import TaskTimeline from "./SelectedTasks/components/TaskTimeline";

const SelectedOnboardTaskContent = ({
  onSubmitted,
  selectedTaskData,
  handleClose
}) => {
  const {
    permOnboardingApproveTasks,
    permOnboardingCancelTasks,
    permOnboardingRejectTasks,
  } = useContext(AuthUserContext);

  const taskActionPermissions =
    (permOnboardingApproveTasks ||
      permOnboardingRejectTasks ||
      permOnboardingCancelTasks) &&
    (selectedTaskData?.taskStatus === TaskStatuses.PENDING ||
      selectedTaskData?.taskStatus === TaskStatuses.PENDING_USER_TASKS ||
      selectedTaskData?.taskStatus === TaskStatuses.READY);

  return (
    <>
      <TaskSection
        title="Onboarding Task Details"
        statusBlock={
          <TaskStatusBlock
            taskStatus={selectedTaskData?.taskStatus}
            id={selectedTaskData?.id}
          />
        }
        tableRows={onboardTaskRows(selectedTaskData)}
      >
        <Divider />
      </TaskSection>

      {taskActionPermissions && (
        <OnboardActionSection
          onSubmitted={onSubmitted}
          handleClose={handleClose}
        />
      )}

      <TaskTimeline taskData={selectedTaskData} />
    </>
  );
};

export default connect(
  (state) => ({
    selectedTaskData: state.taskManager.get("selectedTaskData"),
  }),
  {}
)(memo(SelectedOnboardTaskContent));
