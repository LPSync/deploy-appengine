import React, {memo, useContext, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {Grid, Typography} from "@material-ui/core";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import {GET_REQUISITION_JOB_CODE} from "../../../../operations/queries/getRequisitionJobCode";
import RequestFormLabel from "../../../../components/typographies/RequestFormTypography";

const JobCodeSelect = () => {
  const history = useHistory();
  const {
    jobCode,
    setJobCode,
    location,
    requisitionType
  } = useContext(RequisitionRequestContext);
  const [reqJobCode, setReqJobCode] = useState();

  const [executeSearch] = useLazyQuery(GET_REQUISITION_JOB_CODE, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setReqJobCode(data.get_requisition_job_code?.[0]);
    },
    onError: error => handleError(error)(history)
  });

  useEffect(() => {
    if (requisitionType && location) {
      executeSearch({variables: {search: requisitionType}});
    } else {
      setJobCode("");
    }
  }, [requisitionType, location]);

  useEffect(() => {
    if (location?.countryCode && (reqJobCode?.IntJobCode || reqJobCode?.USJobCode)) {
      if (location?.countryCode === "USA") {
        setJobCode(reqJobCode?.USJobCode);
      } else {
        setJobCode(reqJobCode?.IntJobCode);
      }
    } else {
      setJobCode("");
    }
  }, [reqJobCode, location, setJobCode]);

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormLabel title="Job Code" subtitle="(auto-generated)" />
      </Grid>
      <Grid item xs={8}>
        {jobCode && <Typography component={"div"}>{jobCode}</Typography>}
      </Grid>
    </Grid>
  );
};

export default memo(JobCodeSelect);
