import React, {useContext, useEffect, useState} from "react";
import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import {Box, makeStyles} from "@material-ui/core";
import PageTitleBox from "../../../components/blocks/PageTitleBox";
import Page from "../../../components/Page";
import InfoBlock from "../../../components/InfoBlock";
import FteCandidateTrackerTable from "./components/FteCandidateTrackerTable";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import StyledDrawer from "../../../components/drawers/StyledDrawer";
import ToolbarTypography from "../../../components/typographies/ToolbarTypography";
import SearchInput from "../../../components/SearchInput";
import FteTrackerDrawerContent from "./components/FteTrackerDrawerContent";
import {useLazyQuery, useMutation} from "@apollo/client";
import {SEARCH_FTE_TRACKER_CANDIDATES} from "../../../operations/queries/searchFteTrackerCandidates";
import {UPDATE_FTE_TRACKING} from "../../../operations/mutations/updateFTETracking";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import NoPermissionsError from "../../../components/NoPermissionsError";
import handleError from "../../../data/handleError";
import {useHistory, useParams} from "react-router-dom";
import {AdminRoutes} from "../../../data/constants/FrontendRoutes";

const useStyles = makeStyles({
  page: {
    flex: "1 1 auto",
    height: "100%",
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  root: {
    backgroundColor: "#000",
    color: "#fff",
  },
});

const FteCandidateTrackerPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const {permSysMgmtFteCandidateTracker} = useContext(AuthUserContext);
  const [searchInput, setSearchInput] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [skip, setSkip] = useState(0);
  const [take] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [loadNew, setLoadNew] = useState(true);
  const {username} = useParams();

  const [executeSearch, {loading: dataLoading}] = useLazyQuery(
    SEARCH_FTE_TRACKER_CANDIDATES,
    {
      onCompleted: (data) => {
        updateTableData(data?.search_fte_tracker_candidates);
      },
      onError: (error) => handleError(error)(history),
    }
  );

  const [updateFteTracking, {loading: updatingTracking}] = useMutation(
    UPDATE_FTE_TRACKING,
    {
      onCompleted: (data) => updateSelectedData(data.updateFteTracking),
      onError: (error) => handleError(error)(history),
    }
  );

  const updateTableData = (data) => {
    if (!data || data.length < take) {
      setHasMore(false);
    }
    setTableData((prevData) => {
      if (!loadNew && prevData) return prevData.concat(data);
      else return data;
    });
  };

  useEffect(() => {
    // ***UNCOMMENT FOR PAGINATION
    // executeSearch({variables: {search: searchInput, skip, take}});
    executeSearch({variables: {search: searchInput}});
  }, [searchInput, skip]);

  useEffect(() => {
    if (username && tableData) openDrawerHandler(username);
  }, [username, tableData]);

  const updateSkip = () => {
    setSkip((prevState) => prevState + take);
    setLoadNew(false);
  };

  function openDrawerHandler(username) {
    history.push(`${AdminRoutes.ADMIN_FTE_CANDIDATE_TRACKER}/${username}`);
    const selected = tableData.find((item) => item.username === username);
    if (selected) {
      setSelectedData(selected);
      setDrawerOpen(true);
    } else history.push(AdminRoutes.ADMIN_FTE_CANDIDATE_TRACKER);
  }

  const closeDrawerHandler = () => {
    setDrawerOpen(false);
    setSelectedData(null);
    history.push(AdminRoutes.ADMIN_FTE_CANDIDATE_TRACKER);
  };

  const updateSelectedData = (data) => {
    const selectedDataCopy = {...selectedData, ...data};
    const tableDataCopy = [...tableData];
    const selectedIndex = tableDataCopy.findIndex(
      (item) => item.id === selectedDataCopy.id
    );
    tableDataCopy[selectedIndex] = selectedDataCopy;
    setTableData(tableDataCopy);
    setSelectedData(selectedDataCopy);
  };

  const searchHandler = (value) => {
    setTableData(null);
    setSearchInput(value);
    setSkip(0);
    setHasMore(true);
    setLoadNew(true);
    setSelectedData(null);
  };

  const updateTrackingHandler = ({id, provider, number}) => {
    updateFteTracking({variables: {id, provider, number}});
  };
  return (
    <Page title="FTE Candidate Tracker" className={classes.page}>
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"FTE CANDIDATE TRACKER"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox
          title="FTE Candidate Tracker"
          className={classes.headerBox}
        />
      </Box>
      {permSysMgmtFteCandidateTracker ? (
        <>
          <Box mx={3} mt={3}>
            <InfoBlock type="info" mb={3}>
              This page allows you to manage and track specific FTE Candidate
              Tasks. This view is not for hiring managers or employees.
            </InfoBlock>
            <PaperCardWrapper>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: 16,
                }}
                mb={4}
              >
                <ToolbarTypography title="Full Time Employees" />
                <SearchInput
                  label="Search Users"
                  onSearch={(e) => {
                    searchHandler(e);
                  }}
                  searchQuery={searchInput}
                />
              </Box>

              <FteCandidateTrackerTable
                openDrawerHandler={openDrawerHandler}
                data={tableData?.length ? tableData : []}
                loading={dataLoading}
              />
            </PaperCardWrapper>
          </Box>
          <StyledDrawer isOpen={isDrawerOpen} handleClose={closeDrawerHandler}>
            {selectedData && (
              <FteTrackerDrawerContent
                data={selectedData}
                updateTracking={updateTrackingHandler}
                updatingTracking={updatingTracking}
              />
            )}
          </StyledDrawer>
        </>
      ) : (
        <NoPermissionsError />
      )}
    </Page>
  );
};

export default FteCandidateTrackerPage;
