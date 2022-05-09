import React, {memo, useCallback, useContext, useMemo} from "react";
import {Box, Button, Divider} from "@material-ui/core";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import TaskStatuses from "../../../data/constants/TaskStatuses";
import TaskStatusBlock from "../../../components/taskManager/TaskStatusBlock";
import {Link, useHistory} from "react-router-dom";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import AddIcon from "@material-ui/icons/Add";
import TaskTimeline from "../../TaskManagerPage/SelectedTasks/components/TaskTimeline";
import {connect} from "react-redux";
import {
  setIsDrawerOpen,
  setSelectedTaskData,
} from "../../../data/redux/onboardingDashboard/onboardingDashboardActions";
import TaskSection from "../../TaskManagerPage/SelectedTasks/components/TaskSection";
import SelectedTaskWrapper from "../../TaskManagerPage/SelectedTasks/components/SelectedTaskWrapper";
import {requisitionTaskRows} from "./SelectedRequisitionTaskData";
import SelectedTaskInfoBlock from "./SelectedTaskInfoBlock";
import {
  setFilledByRequisition,
  setRequisitionDetails,
  setJob,
} from "../../../data/redux/candidateRequest/candidateRequestActions";
import SelectedRequisitionActionSection from "./SelectedRequisitionActionSection";

const SelectedRequisitionTaskContent = ({
  selectedTaskData,
  setSelectedTaskData,
  setIsDrawerOpen,
  onSubmitted,
  setRequisitionDetails,
  setFilledByRequisition,
  setJob,
}) => {
  const history = useHistory();
  const {authUser, permRequisitionCancelTasks} = useContext(AuthUserContext);

  const handleClose = useCallback(() => {
    setIsDrawerOpen(false);
    setSelectedTaskData();
  }, [setIsDrawerOpen, setSelectedTaskData]);

  const handleOnboard = useCallback(() => {
    const {
      reqStartDate: startDate,
      reqHiringManagerEmail: email,
      reqHiringManagerFirstName: firstName,
      reqHiringManagerLastName: lastName,
      reqHiringManagerId: employeeNumber,
      reqBusinessUnit: businessUnit,
      reqDepartment: department,
      reqLocationDescription: locationDescription,
      reqLocationCode: locationCode,
      reqType: employeeType,
      reqJobTitle: jobTitle,
      reqJobCode: jobCode,
      // companyCode,
      // isBackfill, backfillFirstName, backfillLastName,
    } = selectedTaskData?.requisitionTask || {};
    const reqDetails = {
      requisitionType: {id: selectedTaskData?.id, jobCode, jobTitle, startDate},
      startDate: startDate,
      hiringManager: {firstName, lastName, email, employeeNumber},
      businessUnit,
      department,
      location: {locationCode, locationDescription},
      employeeType,
    };
    setRequisitionDetails(reqDetails);
    setJob({jobTitle, jobCode});
    setFilledByRequisition(true);
    history.push(FrontendRoutes.REQUISITION_REQUEST);
  }, [selectedTaskData, setRequisitionDetails]);

  const taskActionPermissions = useMemo(
    () =>
      permRequisitionCancelTasks &&
      selectedTaskData?.taskStatus === TaskStatuses.PENDING,
    [permRequisitionCancelTasks, selectedTaskData]
  );

  const checkSelfCreatedTask = (data, user) => {
    const taskUsername = data?.taskCreatorUsername;
    const username = user?.profile?.userName;
    if (!username || !taskUsername) return false;
    return taskUsername === username;
  };

  const selfTaskActionPermissions =
    checkSelfCreatedTask(selectedTaskData, authUser) &&
    (selectedTaskData?.taskStatus === TaskStatuses.PENDING ||
      selectedTaskData?.taskStatus === TaskStatuses.COMPLETE);

  return (
    <SelectedTaskWrapper
      id={selectedTaskData?.id}
      handleClose={handleClose}
      isLoading={!selectedTaskData}
      preChildren={
        <SelectedTaskInfoBlock
          condition={
            selectedTaskData?.taskStatus === TaskStatuses.COMPLETE &&
            !selectedTaskData?.requisitionTask?.reqFulfilled
          }
          text={
            "Your Requisition Request has been approved meaning you can now onboard a candidate against the requisition"
          }
        >
          <Box mt={1}>
            <Button
              variant="contained"
              component={Link}
              onClick={handleOnboard}
              to={FrontendRoutes.CANDIDATE_REQUEST}
            >
              <AddIcon /> onboard candidate
            </Button>
          </Box>
        </SelectedTaskInfoBlock>
      }
    >
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

      {selfTaskActionPermissions && (
        <SelectedRequisitionActionSection
          onSubmitted={onSubmitted}
          handleClose={handleClose}
          selfCreatedTask={selfTaskActionPermissions}
        />
      )}

      <TaskTimeline taskData={selectedTaskData} />
    </SelectedTaskWrapper>
  );
};

export default connect(
  (state) => ({
    selectedTaskData: state.onboardingDashboard.get("selectedTaskData"),
  }),
  {
    setSelectedTaskData,
    setIsDrawerOpen,
    setRequisitionDetails,
    setFilledByRequisition,
    setJob,
  }
)(memo(SelectedRequisitionTaskContent));
