import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import TaskManagerTable from "./TaskManagerTable";
import { GET_ALL_PENDING_TASKS } from "../../../operations/queries/getAllPendingTasks";
import handleError from "../../../data/handleError";
import { useHistory } from "react-router-dom";
import { Box, Toolbar } from "@material-ui/core";
import NoResultsTypography from "../../../components/typographies/NoResultsTypography";
import { AuthUserContext } from "../../../AuthUserContextProvider";
import RefreshButton from "../../../components/buttons/RefreshButton";
import BulkApprovalButton from "./BulkApprovalButton";
import BulkApprovalModal from "./BulkModal/BulkApprovalModal";

const PendingApprovalTasks = () => {
  const history = useHistory();
  const {
    permOffboardingApproveTasks,
    permOnboardingApproveTasks,
    permRequisitionApproveTasks,
    permBulkApproverOnboarding,
    permBulkApproverRequisition,
    permBulkApproverOffboarding,
  } = useContext(AuthUserContext);
  const [pendingTasksData, setPendingTasksData] = useState(null);
  const [openBulkModal, setOpenBulkModal] = useState(false);

  const [executeAllSearch, { loading }] = useLazyQuery(GET_ALL_PENDING_TASKS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setPendingTasksData(data.get_all_pending_tasks);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (
      permOffboardingApproveTasks ||
      permOnboardingApproveTasks ||
      permRequisitionApproveTasks
    ) {
      executeAllSearch();
    }
  }, [
    permOffboardingApproveTasks,
    permOnboardingApproveTasks,
    permRequisitionApproveTasks,
    executeAllSearch,
  ]);

  const hasBulkApprovePermission = permBulkApproverOnboarding
    || permBulkApproverRequisition
    || permBulkApproverOffboarding;

  const handleOpenBulkModal = useCallback(() => {
    setOpenBulkModal(true);
  }, [setOpenBulkModal]);

  const handleCloseBulkModal = useCallback(() => {
    setOpenBulkModal(false);
  }, [setOpenBulkModal]);

  const handleRefresh = () => {
    executeAllSearch()
  };

  return (
    <>
      {loading ? (
        <LoadingCircle text={"Loading tasks..."} />
      ) : pendingTasksData ? (
        <>
          <Toolbar>
            <Box flexGrow={1} />
            {hasBulkApprovePermission && <BulkApprovalButton handleClick={handleOpenBulkModal} />}
            <Box ml={2}>
              <RefreshButton handleClick={executeAllSearch} />
            </Box>
          </Toolbar>

          <TaskManagerTable data={pendingTasksData} />

          {openBulkModal &&
          <BulkApprovalModal
            open={openBulkModal}
            handleClose={handleCloseBulkModal}
            handleRefresh={handleRefresh}
          />
          }
        </>
      ) : (
        <Box>
          <NoResultsTypography />
        </Box>
      )}
    </>
  );
};

export default memo(PendingApprovalTasks);
