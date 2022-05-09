import React, { memo } from "react";
import { Box, makeStyles } from "@material-ui/core";
import CustomTypography from "./GlobalSearchTypography";

const useStyles = makeStyles(() => ({
  topResultsInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const GlobalSearchResultsInfoBlock = ({ searchQuery, allDataLength }) => {
  const classes = useStyles();

  return (
    <Box py={1} px={2} className={classes.topResultsInfo}>
      <CustomTypography title style={{fontSize: "1.25em"}}>
        Search results for: {searchQuery}
      </CustomTypography>

      <CustomTypography title style={{fontSize: "1.25em"}}>
        Showing {allDataLength} results
      </CustomTypography>
    </Box>
  );
};

export default memo(GlobalSearchResultsInfoBlock);