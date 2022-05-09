import React, {memo, useContext} from "react";
import {Box, Divider, Typography} from "@material-ui/core";
import {AuthUserContext} from "../../AuthUserContextProvider";
import TaskStatusBlock from "../../components/taskManager/TaskStatusBlock";
import TaskStatuses from "../../data/constants/TaskStatuses";
import TaskSection from "./SelectedTasks/components/TaskSection";
import {
  hrPayrollRows,
  offboardTaskRows,
} from "./SelectedTasks/SelectedOffboardTaskData";
import {connect} from "react-redux";
import OffboardingTaskActionSection from "./SelectedTasks/SelectedOffboardActionSection";
import TaskTimeline from "./SelectedTasks/components/TaskTimeline";
import HrInformation from "./SelectedTasks/hrInfo/HrInformation";
import {isFullTimeEmployee} from "../../data/constants/EmployeeTypes";
import InfoBlock from "../../components/InfoBlock";
import {Alert} from "@material-ui/lab";

const checkIsDisabledToApprove = (offboardingTask) => {
  const {
    offboardEmployeeType,
    hrTerminationCode,
    hrTerminationType,
    payrollEpochTime,
    payrollEndTimezone,
    payrollEndDateTime,
  } = offboardingTask || {};

  if (isFullTimeEmployee(offboardEmployeeType))
    return !(
      hrTerminationCode &&
      hrTerminationType &&
      payrollEpochTime &&
      payrollEndTimezone &&
      payrollEndDateTime
    );
};
const checkHrInformationExists = (offboardingTask) =>
  !!(offboardingTask?.hrTerminationCode && offboardingTask?.hrTerminationType);

const SelectedOffboardTaskContent = ({
  onSubmitted,
  selectedTaskData,
  handleClose,
}) => {
  const {
    permOffboardingApproveTasks,
    permOffboardingCancelTasks,
    permOffboardingRejectTasks,
    permTaskManagerViewHrInfo,
  } = useContext(AuthUserContext);
  const taskActionPermissions =
    (permOffboardingApproveTasks ||
      permOffboardingRejectTasks ||
      permOffboardingCancelTasks) &&
    (selectedTaskData?.taskStatus === TaskStatuses.PENDING ||
      selectedTaskData?.taskStatus === TaskStatuses.READY);

  const isApproveDisabled = checkIsDisabledToApprove(
    selectedTaskData?.offboardingTask
  );
  const isHrInformationExist = checkHrInformationExists(
    selectedTaskData?.offboardingTask
  );
  return (
    <>
      <TaskSection
        title="Offboarding Task Details"
        statusBlock={
          <TaskStatusBlock
            taskStatus={selectedTaskData?.taskStatus}
            id={selectedTaskData?.id}
          />
        }
        tableRows={offboardTaskRows(selectedTaskData)}
      >
        <Divider />
      </TaskSection>

      {permTaskManagerViewHrInfo &&
        (isHrInformationExist ? (
          <TaskSection
            title="HR/Payroll Information"
            tableRows={hrPayrollRows(selectedTaskData)}
          >
            <Divider />
          </TaskSection>
        ) : (
          <TaskSection title="HR/Payroll Information">
            <Box my={2} mx={4}>
              {isApproveDisabled ? (
                <Alert severity="warning" variant="outlined">
                  <Typography component={"div"} variant="p">
                    HR/Payroll Information is required for approval
                  </Typography>
                </Alert>
              ) : (
                <InfoBlock small>
                  <Typography component={"div"} variant="p">
                    HR/Payroll Information is optional
                  </Typography>
                </InfoBlock>
              )}
            </Box>

            <HrInformation />
            <Divider />
          </TaskSection>
        ))}
      {taskActionPermissions && (
        <OffboardingTaskActionSection
          approveDisabled={isApproveDisabled}
          onSubmitted={onSubmitted}
          handleClose={handleClose}
        />
      )}

      <TaskTimeline taskData={selectedTaskData} isOffboarding />
    </>
  );
};

export default connect(
  (state) => ({selectedTaskData: state.taskManager.get("selectedTaskData")}),
  {}
)(memo(SelectedOffboardTaskContent));
