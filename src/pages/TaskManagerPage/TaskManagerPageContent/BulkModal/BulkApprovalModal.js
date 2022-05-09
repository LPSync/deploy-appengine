import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import ModalTopBar from "../../../../components/modals/ModalTopBar";
import CustomModal from "../../../../components/modals/CustomModal";
import BulkApprovalTask from "./BulkApprovalTask";
import { useLazyQuery } from "@apollo/client";
import handleError from "../../../../data/handleError";
import { useHistory } from "react-router-dom";
import CircularIndeterminate from "../../../../components/circularProgress/LoadingCircle";
import NoResultsTypography from "../../../../components/typographies/NoResultsTypography";
import { GET_ALL_BULK_APPROVAL_TASKS } from "../../../../operations/queries/getAllBulkApprovalTasks";
import { getBulkApprovalTaskData } from "./BulkApprovalData";
import BulkApprovalSubmitButton from "./BulkApprovalSubmitButton";
import CustomInfiniteScroll from "../../../../components/table/CustomInfiniteScroll";

const useStyles = makeStyles(() => ({
  bulkApprovalModalContainer: {
    overflow: "auto",
    maxHeight: "calc(95vh - 190px)",
  },
}));

const itemsPerPage = 15;

const BulkApprovalModal = ({ open, handleClose, handleRefresh }) => {
  const classes = useStyles();
  const history = useHistory();
  const [tasks, setTasks] = useState();
  const tasksData = useMemo(() => tasks?.map(getBulkApprovalTaskData), [tasks]);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [tasksCountStatus, setTasksCountStatus] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  const [executeAllBulkSearch, { loading }] = useLazyQuery(GET_ALL_BULK_APPROVAL_TASKS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      if (data) {
        if (pageCount > 0) {
          setTasks([...tasks, ...data.get_all_bulk_approval_tasks]);
        } else {
          setTasks(data.get_all_bulk_approval_tasks);
        }
        setTasksCountStatus(data.get_all_bulk_approval_tasks?.length >= itemsPerPage);
      }
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    executeAllBulkSearch(
      { variables: { filters: { pageCount, itemsPerPage } } },
    );
  }, [pageCount]);

  const handlePageChange = (page) => {
    if (!loading) {
      setPageCount(page);
    }
  };

  const handleSubmitClose = useCallback(() => {
    setTasks([]);
    setSelectedTaskIds([]);
    setTasksCountStatus(true);
    handleRefresh && handleRefresh();
    handleClose();
    if (pageCount) {
      setPageCount(0);
    }
  }, []);

  return (
    <CustomModal
      minwidth={900}
      width={1200}
      height={"auto"}
      open={open}
      onClose={handleClose}
      middlePosition
      aria-labelledby="request-form-alert"
      aria-describedby="request-form-description"
    >
      <ModalTopBar title="Task Manager - Bulk Approval" handleClose={handleClose} />

      <Box m={2} mr={0} className={classes.bulkApprovalModalContainer} id={"bulk-approval-pending-tasks"}>
        {(loading && !tasks?.length)
          ? <CircularIndeterminate />
          : (!tasks?.length || !tasksData?.length)
            ? <NoResultsTypography />
            : (
              <Box mr={2}>
                <CustomInfiniteScroll
                  scrollableTarget="bulk-approval-pending-tasks"
                  dataLength={tasksData?.length}
                  next={() => handlePageChange(pageCount + 1)}
                  hasMore={tasksCountStatus}
                >
                  {tasksData?.map(task => (
                    <BulkApprovalTask
                      key={task.id}
                      task={task}
                      selected={selectedTaskIds?.includes(task?.id)}
                      setSelected={setSelectedTaskIds}
                    />
                  ))}
                </CustomInfiniteScroll>
              </Box>
            )
        }
      </Box>

      <BulkApprovalSubmitButton
        tasks={tasks}
        taskIds={selectedTaskIds}
        handleSubmitClose={handleSubmitClose}
      />
    </CustomModal>
  );
};

export default memo(BulkApprovalModal);