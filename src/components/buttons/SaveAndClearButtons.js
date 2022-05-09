import React, {memo} from "react";
import {Box, Button, makeStyles} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.5rem",
  },
}));

const SaveAndClearButtons = ({handleClear, handleSave, isButtonsDisabled}) => {
  const classes = useStyles();

  return (
    <Box m={3} className={classes.btnBox}>
      <Button
        variant="outlined"
        disabled={isButtonsDisabled}
        onClick={handleClear}
      >
        <ClearIcon className={classes.icon} />
        Clear
      </Button>

      <Button
        color="secondary"
        variant="contained"
        disabled={isButtonsDisabled}
        onClick={handleSave}
      >
        <SaveIcon className={classes.icon} />
        Save
      </Button>
    </Box>
  );
};

export default memo(SaveAndClearButtons);
