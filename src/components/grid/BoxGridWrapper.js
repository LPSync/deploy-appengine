import React, {memo} from "react";
import {Box, Grid, makeStyles} from "@material-ui/core";
import TableCircularProgress from "../circularProgress/TableCircularProgress";
import NoResultsTypography from "../typographies/NoResultsTypography";

const useStyles = makeStyles(() => ({
  iconBox: {
    border: "1px solid #4667c8",
    borderRadius: "5px",
  },
}));

const BoxGridWrapper = ({children, loading, dataLength}) => {
  const classes = useStyles();

  return (
    <Box className={classes.iconBox}>
      <Box m={1} style={{position: "relative"}}>
        {loading ? (
          <TableCircularProgress />
        ) : !dataLength ? (
          <NoResultsTypography />
        ) : (
          <Box>
            <Grid container spacing={2}>
              {children}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default memo(BoxGridWrapper);
