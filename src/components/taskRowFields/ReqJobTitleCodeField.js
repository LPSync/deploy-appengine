import React, {memo} from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  jobTitle: {
    fontWeight: 600
  },
  tinyFontSize: {
    fontSize: ".7rem"
  }
}));

const ReqJobTitleCodeField = ({req}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.jobTitle}>
        {req?.requisitionTask?.reqJobTitle}
      </div>
      <div className={classes.tinyFontSize}>
        Job Code: {req?.requisitionTask?.reqJobCode}
      </div>
    </>
  );
};

export default memo(ReqJobTitleCodeField);
