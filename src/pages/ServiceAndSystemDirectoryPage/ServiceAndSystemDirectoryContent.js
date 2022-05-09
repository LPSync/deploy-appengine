import React, {memo, useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import PageComponent from "./components/PageComponent";
import SaSContainer from "./components/SaSContainer";
import SaSSearch from "./components/SaSSearch";
import SaSTitle from "./components/SaSTitle";
import SaSList from "./components/SaSList";
import SaSModal from "./components/SaSModal";
import {useLazyQuery} from "@apollo/client";
import {SEARCH_SYSTEMS_AND_SERVICES} from "../../operations/queries/searchSystemsAndServices";
import {GET_GROUP_MEMBERS} from "../../operations/queries/getGroupMembers";
import {AuthUserContext} from "../../AuthUserContextProvider";
import NoPermissionsError from "../../components/NoPermissionsError";

export const ServiceAndSystemDirectoryTitle = "SERVICE & SYSTEM DIRECTORY";

const ServiceAndSystemDirectoryContent = () => {
  const Title = ServiceAndSystemDirectoryTitle;
  const {permSystemsAndServicesView} = useContext(AuthUserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchType, setSearchType] = useState("All");
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [modalData, setModalData] = useState(null);

  const [searchSystemsAndServices, {loading: loadingData}] = useLazyQuery(
    SEARCH_SYSTEMS_AND_SERVICES,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => setData(data.search_systems_and_services),
      onError: (error) => console.log(error),
    }
  );
  const [getGroupMembers, {loading: loadingGroupMembers, variables}] =
    useLazyQuery(GET_GROUP_MEMBERS, {
      fetchPolicy: "no-cache",
      onCompleted: (data) =>
        setModalData({
          name: variables.group,
          members: data.get_group_members,
        }),
      onError: (error) => console.log(error),
    });

  const searchHandler = () => {
    searchSystemsAndServices({variables: {search: searchQuery}});
    setShowSearchResults(true);
  };
  const changeHandler = (value) => {
    setSearchQuery(value);
    if (value.trim() === "") {
      searchSystemsAndServices({variables: {search: ""}});
      setShowSearchResults(false);
    }
  };
  const closeHandler = () => {
    setShowSearchResults(false);
    searchSystemsAndServices({variables: {search: ""}});
  };

  const handleModalOpen = (groupName) => {
    setModalOpen(true);
    getGroupMembers({
      variables: {
        group: groupName,
      },
    });
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const ownedByYouTooltip =
    "These are all of the services and systems that you are owner of.";
  const activeNotificationTooltip =
    "These are the systems and services that currently have active notifications.";
  const searchNotificationTooltip =
    "These are the systems and services that you are searching for.";

  useEffect(() => {
    searchSystemsAndServices({variables: {search: ""}});
  }, []);

  return (
    <PageComponent title={Title} breadcrumbs={[Title]}>
      {permSystemsAndServicesView ? (
        <>
          <SaSContainer gradient>
            <SaSSearch
              onSearch={searchHandler}
              onChange={changeHandler}
              onClose={closeHandler}
              query={searchQuery}
              queryType={searchType}
              setQueryType={setSearchType}
              loading={loadingData}
            />
          </SaSContainer>

          {showSearchResults ? (
            <SaSContainer>
              <SaSTitle tooltipText={searchNotificationTooltip} mb={2}>
                Search Results
              </SaSTitle>
              <SaSList
                data={data}
                openModal={handleModalOpen}
                loading={loadingData}
              />
            </SaSContainer>
          ) : (
            <>
              <SaSContainer>
                <SaSTitle tooltipText={ownedByYouTooltip} mb={2}>
                  Services/systems owned by you
                </SaSTitle>
                <SaSList
                  data={data}
                  openModal={handleModalOpen}
                  loading={loadingData}
                />
              </SaSContainer>

              <SaSContainer>
                <SaSTitle tooltipText={activeNotificationTooltip} mb={2}>
                  Services/systems with active notifications
                </SaSTitle>
                <SaSList
                  data={data?.filter((s) => s.flag)}
                  openModal={handleModalOpen}
                  loading={loadingData}
                />
              </SaSContainer>
            </>
          )}

          <SaSModal
            isModalOpen={isModalOpen}
            handleModalClose={handleModalClose}
            data={modalData}
            loading={loadingGroupMembers}
          />
        </>
      ) : (
        <NoPermissionsError />
      )}
    </PageComponent>
  );
};

export default memo(ServiceAndSystemDirectoryContent);
