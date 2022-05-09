import React, {memo} from "react";
import {Box, makeStyles} from "@material-ui/core";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";

const useStyles = makeStyles(() => ({
  loadingBox: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}))
const UserLoadingCircle = ({text}) => {
  const classes = useStyles();
  return (
    <Box mt={3} className={classes.loadingBox}>
      <LoadingCircle text={text || "Gathering your info via API..."} />
    </Box>
  )
}
export default memo(UserLoadingCircle);