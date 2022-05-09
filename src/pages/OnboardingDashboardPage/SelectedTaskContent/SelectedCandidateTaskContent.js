import React, {memo, useCallback, useContext, useMemo} from "react";
import {Divider} from "@material-ui/core";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import TaskStatuses from "../../../data/constants/TaskStatuses";
import TaskStatusBlock from "../../../components/taskManager/TaskStatusBlock";
import TaskTimeline from "../../TaskManagerPage/SelectedTasks/components/TaskTimeline";
import {connect} from "react-redux";
import {setIsDrawerOpen, setSelectedTaskData} from "../../../data/redux/onboardingDashboard/onboardingDashboardActions";
import TaskSection from "../../TaskManagerPage/SelectedTasks/components/TaskSection";
import {onboardTaskRows} from "../../TaskManagerPage/SelectedTasks/SelectedOnboardTaskData";
import SelectedTaskWrapper from "../../TaskManagerPage/SelectedTasks/components/SelectedTaskWrapper";
import SelectedCandidateActionSection from "./SelectedCandidateActionSection";
import SelectedTaskInfoBlock from "./SelectedTaskInfoBlock";

const SelectedCandidateTaskContent = ({selectedTaskData, setSelectedTaskData, setIsDrawerOpen, onSubmitted}) => {
  const {permOnboardingCancelTasks} = useContext(AuthUserContext);

  const handleClose = useCallback(() => {
    setIsDrawerOpen(false);
    setSelectedTaskData();
  }, [setIsDrawerOpen, setSelectedTaskData]);

  const taskActionPermissions = useMemo(() =>
      (permOnboardingCancelTasks) &&
      (selectedTaskData?.taskStatus === TaskStatuses.PENDING ||
        selectedTaskData?.taskStatus === TaskStatuses.PENDING_USER_TASKS ||
        selectedTaskData?.taskStatus === TaskStatuses.READY),
    [permOnboardingCancelTasks, selectedTaskData]);

  return (
    <SelectedTaskWrapper
      id={selectedTaskData?.id}
      handleClose={handleClose}
      isLoading={!selectedTaskData}
      preChildren={
        <SelectedTaskInfoBlock
          condition={selectedTaskData?.taskStatus === TaskStatuses.COMPLETE}
          text={
            "The candidate has been onboarded successfully. This means that " +
            "they have received their IT Welcome Email which contains their " +
            `login details. This information was sent to ${selectedTaskData?.onboardingTask.onboardNonLpEmail}`
          }
        />
      }
    >
      <TaskSection
        title="Candidate Task Details"
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

      <TaskTimeline taskData={selectedTaskData} />

      {taskActionPermissions && (
        <SelectedCandidateActionSection
          onSubmitted={onSubmitted}
          handleClose={handleClose}
        />
      )}

    </SelectedTaskWrapper>
  );
};

export default connect(state => ({
  selectedTaskData: state.onboardingDashboard.get("selectedTaskData")
}), {setSelectedTaskData, setIsDrawerOpen})
(memo(SelectedCandidateTaskContent));
