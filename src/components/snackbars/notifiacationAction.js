import React, { Fragment } from "react";
import { Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const action = (key, onClose, onShow) => (
  <Fragment>
    <Button onClick={() => {onShow(); onClose(key);}}>
      Show
    </Button>
    <IconButton onClick={() => { onClose(key) }}>
      <ClearIcon/>
    </IconButton>
  </Fragment>
);

export default action;


export const getNotificationMessage = (taskType, type, id) => {
  return `The ${taskType} task with id ${id} was ${type}`;
};