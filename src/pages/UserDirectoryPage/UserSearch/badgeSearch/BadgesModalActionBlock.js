import React, { memo } from "react";
import { Box, Button, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  modalBottomBox: {
    display: "flex",
    justifyContent: "flex-end",
  },
  modalSearchButton: {
    color: theme.palette.text.primary,
    background: theme.palette.warning.main,
    "&:hover": {
      background: "rgba(255, 107, 0, 0.8)",
    },
  },
}));

const BadgesModalActionBlock = ({handleSearch, disabled, submitting}) => {
  const classes = useStyles();
  return (
    <Box className={classes.modalBottomBox}>
      <Button
        variant="contained"
        size="small"
        onClick={handleSearch}
        className={classes.modalSearchButton}
        disabled={disabled}
      >
        {submitting && <CircularProgress size={20} color="inherit" style={{ marginRight: 4 }} />}
        Find Users Matching Skills
      </Button>
    </Box>
  )
}

export default memo(BadgesModalActionBlock);