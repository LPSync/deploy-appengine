import React, {memo, useContext, useEffect, useState} from "react";
import {AppBar, Box, makeStyles, Tabs, Typography} from "@material-ui/core";
import {ServiceAndSystemDirectoryTitle as DirectoryTitle} from "../ServiceAndSystemDirectoryContent";
import PageComponent from "../components/PageComponent";
import {useParams, useHistory} from "react-router-dom";
import SaSContainer from "../components/SaSContainer";
import StyledTab from "../../../components/tabs/StyledTab";
import CustomTabPanel from "../../../components/tabs/CustomTabPanel";
import Overview from "./Overview";
import People from "./People";
import Dependencies from "./Dependencies";
import {useLazyQuery} from "@apollo/client";
import {
  GET_SERVICE_WITH_ID,
  SEARCH_SYSTEMS_AND_SERVICES,
} from "../../../operations/queries/searchSystemsAndServices";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import SaSSearch from "../components/SaSSearch";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import SearchResults from "./components/SearchResults";
import TaskStatusBlock from "../../../components/taskManager/TaskStatusBlock";
import SaSFlag from "../components/SaSFlag";
import NoPermissionsError from "../../../components/NoPermissionsError";
import {AuthUserContext} from "../../../AuthUserContextProvider";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "10px",
  },
  tabPanel: {
    height: "50vh",
    overflow: "auto",
  },
  link: {
    color: "inherit",
    "&:hover": {
      color: theme.palette.secondary.main,
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  topBarTier: {
    marginRight: 30,
  },
  topBarTitle: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  topBarDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  paper: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const ServiceComponent = () => {
  const classes = useStyles();
  const {id} = useParams();
  const history = useHistory();
  const {permSystemsAndServicesView} = useContext(AuthUserContext);
  const [serviceData, setServiceData] = useState(null);
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("All");
  const [data, setData] = useState(null);
  const [isResultsOpen, setResultsOpen] = useState(false);

  const lastUpdated = new Date(Number(serviceData?.lastUpdated));

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  const [loadService, {loading: loadingService}] = useLazyQuery(
    GET_SERVICE_WITH_ID,
    {
      onCompleted: (data) => setServiceData(data.get_service_with_id),
      onError: (error) => console.log(error),
    }
  );
  const [searchSystemsAndServices, {loading: loadingData}] = useLazyQuery(
    SEARCH_SYSTEMS_AND_SERVICES,
    {
      onCompleted: (data) => setData(data.search_systems_and_services),
      onError: (error) => console.log(error),
    }
  );

  const searchHandler = () => {
    setData(null);
    if (searchQuery.trim() !== "") {
      setResultsOpen(true);
      searchSystemsAndServices({variables: {search: searchQuery}});
    } else {
      setResultsOpen(false);
    }
  };
  const changeHandler = (value) => {
    setSearchQuery(value);
  };

  const redirectHandler = (id) => {
    setData(null);
    setSearchQuery("");
    setResultsOpen(false);
    setValue(0);
    history.push(`${FrontendRoutes.SERVICE_AND_SYSTEM_DIRECTORY}/${id}`);
  };

  const searchBlurHandler = () => {
    setResultsOpen(false);
  };

  useEffect(() => {
    loadService({
      variables: {
        id,
      },
    });
  }, [id]);

  return (
    <PageComponent
      title={serviceData?.name}
      breadcrumbs={[DirectoryTitle, serviceData?.name.toUpperCase()]}
      backButtonLink={FrontendRoutes.SERVICE_AND_SYSTEM_DIRECTORY}
    >
      {permSystemsAndServicesView ? (
        <>
          <SaSContainer gradient>
            <SaSSearch
              onSearch={searchHandler}
              onChange={changeHandler}
              query={searchQuery}
              queryType={searchType}
              setQueryType={setSearchType}
              loading={loadingData}
              onBlur={searchBlurHandler}
            />
            {searchQuery && data?.length >= 0 && (
              <SearchResults
                data={data}
                isResultsLoading={loadingData}
                resultsOpen={isResultsOpen}
                onClick={redirectHandler}
              />
            )}
          </SaSContainer>

          <Box mx={3} mt={3} className={classes.block}>
            <PaperCardWrapper>
              <Box className={classes.topBar}>
                {serviceData?.tier && (
                  <Box className={classes.topBarTier}>
                    <TaskStatusBlock
                      taskStatus={Number(serviceData?.tier)}
                      id={serviceData?.tier}
                    />
                  </Box>
                )}
                <Box className={classes.topBarTitle}>
                  <Typography className={classes.title}>
                    {serviceData?.name}
                  </Typography>
                  {serviceData?.type && (
                    <Typography variant={"subtitle1"}>
                      Service: {serviceData?.type}
                    </Typography>
                  )}
                </Box>
                <Box className={classes.topBarDate}>
                  {serviceData?.lastUpdated && (
                    <Typography variant={"subtitle1"}>
                      Last Updated: {lastUpdated.toDateString()}
                    </Typography>
                  )}
                  <Box>
                    {serviceData?.flag && <SaSFlag data={serviceData?.flag} />}
                  </Box>
                </Box>
              </Box>

              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleTabsChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="systemAndServices dashboard tabs navigation"
                  className={classes.paper}
                >
                  <StyledTab label="Overview" />
                  <StyledTab label="People" />
                  <StyledTab label="Dependencies" />
                  )}
                </Tabs>
              </AppBar>

              <CustomTabPanel
                value={value}
                index={0}
                className={classes.tabPanel}
              >
                <Overview data={serviceData} loading={loadingService} />
              </CustomTabPanel>
              <CustomTabPanel
                value={value}
                index={1}
                className={classes.tabPanel}
              >
                <People data={serviceData} />
              </CustomTabPanel>
              <CustomTabPanel
                value={value}
                index={2}
                className={classes.tabPanel}
              >
                <Dependencies
                  data={serviceData?.dependencies}
                  viewHandler={redirectHandler}
                />
              </CustomTabPanel>
            </PaperCardWrapper>
          </Box>
        </>
      ) : (
        <NoPermissionsError />
      )}
    </PageComponent>
  );
};

export default memo(ServiceComponent);
