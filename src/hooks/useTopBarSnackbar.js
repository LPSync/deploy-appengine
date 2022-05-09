import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useHistory, useRouteMatch} from "react-router-dom";
import {useSubscription} from "@apollo/client";
import {CREATE_TASK_SUBSCRIPTION} from "../operations/subscription/createTaskSubscription";
import {UPDATE_TASK_SUBSCRIPTION} from "../operations/subscription/updateTaskSubscription";
import {enqueueSnackbar} from "../data/redux/common/commonActions";
import {getNotificationMessage} from "../components/snackbars/notifiacationAction";
import FrontendRoutes from "../data/constants/FrontendRoutes";

const useTopBarSnackbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isTaskManager = useRouteMatch(FrontendRoutes.TASK_MANAGER_VIEW());

  const createTaskSubscription = useSubscription(CREATE_TASK_SUBSCRIPTION);
  const updateTaskSubscription = useSubscription(UPDATE_TASK_SUBSCRIPTION);

  const handleShow = useCallback((taskType, id) => {
    if (taskType && id) {
      history.push(
        FrontendRoutes.TASK_MANAGER_VIEW_TASK(
          isTaskManager?.params?.hash || "alltasks",
          id,
        ),
      );
    }
  }, [isTaskManager, history]);

  useEffect(() => {
    const subData = createTaskSubscription?.data?.createTaskSubscription;
    if (subData) {
      dispatch(enqueueSnackbar({
        message: getNotificationMessage(
          subData?.taskType,
          "created",
          subData?.id,
        ),
        onShow: () => handleShow(subData?.taskType, subData?.id),
      }));
    }
  }, [createTaskSubscription.data, createTaskSubscription.error, dispatch, handleShow]);

  useEffect(() => {
    const subData = updateTaskSubscription?.data?.updateTaskSubscription;
    if (subData) {
      dispatch(enqueueSnackbar({
        message: getNotificationMessage(
          subData?.taskType,
          "updated",
          subData?.id,
        ),
        onShow: () => handleShow(subData?.taskType, subData?.id),
      }));
    }
  }, [updateTaskSubscription.data, updateTaskSubscription.error, dispatch, handleShow]);
}

export default useTopBarSnackbar;