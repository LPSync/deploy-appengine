import React, {memo} from "react";
import {Box, Button, makeStyles, Typography} from "@material-ui/core";
import FrontendRoutes from "../../data/constants/FrontendRoutes";

const useStyles = makeStyles(() => ({
  notFoundBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "calc(95vh - 64px)",
    lineHeight: 5
  }
}));

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <Box className={classes.notFoundBox}>
      <Typography variant="h4">404 - Not Found!</Typography>
      <Typography>This page doesn't exist.</Typography>
      <Box ml={1} mb={3}>
        <Button color="secondary" variant="outlined" href={FrontendRoutes.HOME}>
         lpsync home
        </Button>
      </Box>
    </Box>
  );
};

export default memo(NotFoundPage);