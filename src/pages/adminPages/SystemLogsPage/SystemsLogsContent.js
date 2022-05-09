import React, {memo, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {NetworkStatus, useQuery} from "@apollo/client";
import {Box} from "@material-ui/core";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import {GET_LOG_ENTRIES} from "../../../operations/adminQueries/getLogEntries";
import handleError from "../../../data/handleError";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import NoResultsTypography from "../../../components/typographies/NoResultsTypography";
import SystemsLogsTable from "./SystemsLogsTable";
import SystemLogsFilters from "./SystemLogsFilters";
import SystemLogsTopBox from "./SystemLogsTopBox";

const SystemsLogsContent = () => {
  const history = useHistory();

  const [filterOpen, setFilterOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allLogsData, setAllLogsData] = useState();
  const [logsData, setLogsData] = useState(allLogsData);

  const {error, loading, networkStatus, refetch} = useQuery(GET_LOG_ENTRIES, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setAllLogsData(data.get_log_entries);
      setLogsData(data.get_log_entries);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (loading || networkStatus === NetworkStatus.refetch) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading, networkStatus, logsData]);

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  if (error) {
    return <p>`Error! ${error.message}`</p>;
  }

  return (
    <Box>
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <>
          <Box mt={3}>
            <PaperCardWrapper>

              <SystemLogsTopBox
                refetch={refetch}
                handleFilterClick={handleFilterClick}
                isFilterApplied={isFilterApplied}
              />

              <SystemLogsFilters
                filterOpen={filterOpen}
                allLogsData={allLogsData}
                setIsFilterApplied={setIsFilterApplied}
                setLogsData={setLogsData}
              />
            </PaperCardWrapper>
          </Box>

          {logsData && (
            <>
              {!logsData?.length ? (
                <NoResultsTypography />
              ) : (
                <SystemsLogsTable logsData={logsData} />
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(SystemsLogsContent);