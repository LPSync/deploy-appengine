import {useLazyQuery} from "@apollo/client";
import handleError from "../../../../data/handleError";
import React, {useState, useEffect} from "react";
import {GET_GOOGLE_CLOUD_SCHEDULER_TASKS} from "../../../../operations/queries/getGoogleCloudSchedulerTasks";
import {useHistory} from "react-router-dom";
import {Box, makeStyles} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import {SCHEDULER_JOBS_TABLE_COLUMNS} from "../../../../data/constants/SchedulerJobs";

const GRID_BOX_HEIGHT = 500,
  CONTENT_HEIGHT_COEFFICIENT = 1.3054830287;

const useStyles = makeStyles((theme) => ({
  loaderBox: {
    margin: "0 auto 0 auto",
  },
  noRowsOverlay: {
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: `${GRID_BOX_HEIGHT / CONTENT_HEIGHT_COEFFICIENT}px`,
    height: "100%",
  },
}));

const addIdsToJobsData = (jobsData) =>
  jobsData?.length
    ? jobsData.map((jobData) => ({
        ...jobData,
        id: jobData.name + Math.random(),
      }))
    : [];

const SchedulerJobsPageContent = () => {
  const history = useHistory();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [jobsData, setJobsData] = useState([]);

  const [
    getJobsData,
    {data, refetch: refetchJobsData, called: jobsDataFetched},
  ] = useLazyQuery(GET_GOOGLE_CLOUD_SCHEDULER_TASKS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setJobsData(addIdsToJobsData(data.get_google_cloud_scheduler_tasks));
      setIsLoading(false);
    },
    onError: (error) => {
      handleError(error)(history);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (!jobsDataFetched) {
      getJobsData();
    } else {
      refetchJobsData();
    }
  }, []);

  const NoRowsOverlay = () => (
    <Box className={classes.noRowsOverlay}>No results found</Box>
  );

  const getJobsTable = () => {
    return jobsData?.length ? (
      <DataGrid
        rows={jobsData}
        columns={SCHEDULER_JOBS_TABLE_COLUMNS}
        components={{
          NoRowsOverlay,
        }}
      />
    ) : null;
  };

  return (
    <Box bgcolor="#FCFCFC" p={4} minWidth={1050}>
      <div style={{height: GRID_BOX_HEIGHT, width: "100%"}}>
        {isLoading ? <LoadingCircle /> : getJobsTable()}
      </div>
    </Box>
  );
};

export default SchedulerJobsPageContent;
