import React, { memo } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  modalBadgesContentBlock: {
    background: theme.palette.primary.light,
    border: "1px solid " + theme.palette.text.primary,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const UserBadgesModalBlock = ({title, children}) => {
  const classes = useStyles();

  return (
    <Box className={classes.modalBadgesContentBlock}>
      <Typography> {title} </Typography>
      {children}
    </Box>
  )
};

export default memo(UserBadgesModalBlock);