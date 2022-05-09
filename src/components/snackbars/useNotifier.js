import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { closeSnackbar as closeSnackbarAction, removeSnackbar } from "../../data/redux/common/commonActions";
import action from "./notifiacationAction";

let displayed = [];

const useNotifier = () => {
  const dispatch = useDispatch();
  const handleCloseSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  const notifications = useSelector(state => state.common.get("notifications") || []);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter(key => id !== key)];
  };

  useEffect(() => {
    notifications?.forEach(({ key, message, options = {}, dismissed = false, onShow }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed?.includes(key)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        variant: "success",
        ...options,
        action: () => action(key, handleCloseSnackbar, onShow),
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(removeSnackbar(myKey));
          removeDisplayed(myKey);
        },
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;
