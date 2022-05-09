import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useLazyQuery, useMutation} from "@apollo/client";
import {Box, makeStyles} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import {GENERATE_CANDIDATE_NON_FTE_TASKS_TABLE_COLUMNS} from "../../../../data/constants/CandidateNonFteTasks";
import handleError from "../../../../data/handleError";
import {GET_CANDIDATE_TASKS_FOR_ADMIN_CANDIDATE_PORTAL_ACCESS} from "../../../../operations/queries/getCandidateNonFteTasksForAdminCandidatePortalAccess";
import {TOGGLE_CANDIDATE_TASK_STATUS} from "../../../../operations/mutations/toggleCandidateTaskStatus";

const GRID_BOX_HEIGHT = 500,
  CONTENT_HEIGHT_COEFFICIENT = 1.3054830287;

const useStyles = makeStyles(() => ({
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

const CandidatePortalAccessContent = () => {
  const history = useHistory();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [candidatesData, setCandidatesData] = useState([]);

  const [getCandidateData] = useLazyQuery(
    GET_CANDIDATE_TASKS_FOR_ADMIN_CANDIDATE_PORTAL_ACCESS,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        setCandidatesData(data.get_candidate_tasks);
        setIsLoading(false);
      },
      onError: (error) => {
        handleError(error)(history);
        setIsLoading(false);
      },
    }
  );

  const [toggleCandidateAccess, {loading: candidateAccessToggling}] =
    useMutation(TOGGLE_CANDIDATE_TASK_STATUS);

  useEffect(() => {
    if (!candidateAccessToggling) {
      getCandidateData();
    }
  }, [candidateAccessToggling]);

  const removeCandidate = (event, candidateId, candidateType) => {
    event.stopPropagation(); // don't select this row after clicking
    toggleCandidateAccess({
      variables: {
        input: {
          id: +candidateId,
          taskType: candidateType,
        },
      },
    });
  };

  const NoRowsOverlay = () => (
    <Box className={classes.noRowsOverlay}>No results found</Box>
  );

  const getCandidateNFteTasksTable = () => {
    return candidatesData?.length ? (
      <DataGrid
        rows={candidatesData}
        columns={GENERATE_CANDIDATE_NON_FTE_TASKS_TABLE_COLUMNS(
          removeCandidate
        )}
        components={{NoRowsOverlay}}
      />
    ) : null;
  };

  return (
    <Box bgcolor="#FCFCFC" p={4} minWidth={1050}>
      <div style={{height: GRID_BOX_HEIGHT, width: "100%"}}>
        {isLoading ? <LoadingCircle /> : getCandidateNFteTasksTable()}
      </div>
    </Box>
  );
};

export default CandidatePortalAccessContent;
