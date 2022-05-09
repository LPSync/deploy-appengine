import React, {memo, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {useHistory} from "react-router-dom";
import {GET_REQUISITION_JOB_CODE} from "../../../operations/queries/getRequisitionJobCode";
import handleError from "../../../data/handleError";
import {Grid, Typography} from "@material-ui/core";
import RequestFormTypography from "../../typographies/RequestFormTypography";

const JobCode = ({
  jobCode,
  setJobCode,
  locationCountryCode,
  employeeType,
  isFilledByRequisition,
}) => {
  const history = useHistory();
  const [reqJobCode, setReqJobCode] = useState();

  const [executeSearch] = useLazyQuery(GET_REQUISITION_JOB_CODE, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setReqJobCode(data.get_requisition_job_code?.[0]);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (!isFilledByRequisition) {
      if (employeeType && locationCountryCode) {
        executeSearch({variables: {search: employeeType}});
      } else {
        setJobCode("");
      }
    }
  }, [employeeType, locationCountryCode]);

  useEffect(() => {
    if (!isFilledByRequisition) {
      if (
        locationCountryCode &&
        employeeType &&
        (reqJobCode?.IntJobCode || reqJobCode?.USJobCode)
      ) {
        if (locationCountryCode === "USA") {
          setJobCode(reqJobCode?.USJobCode);
        } else {
          setJobCode(reqJobCode?.IntJobCode);
        }
      } else {
        setJobCode("");
      }
    }
  }, [reqJobCode, locationCountryCode, setJobCode]);

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Job Code" subtitle="(auto-generated)" />
      </Grid>
      <Grid item xs={8}>
        {jobCode && <Typography component={"div"}>{jobCode}</Typography>}
      </Grid>
    </Grid>
  );
};

export default memo(JobCode);
