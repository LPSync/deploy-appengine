import React, {memo, useCallback, useContext, useEffect, useState} from "react";
import {connect} from "react-redux";
import {useLazyQuery} from "@apollo/client";
import {Box, makeStyles} from "@material-ui/core";
import Page from "../../components/Page";
import {SEARCH_USER_DIRECTORY} from "../../operations/queries/searchUserDirectory";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import {AuthUserContext} from "../../AuthUserContextProvider";
import PaperCardWrapper from "../../components/PaperCardWrapper";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import UserDirectoryFilterBlock from "./UserDirectoryFilterBlock";
import UserDirectoryTable from "./UserSearch/UserDirectoryTable";
import UserToolbarTypography from "../../components/typographies/ToolbarTypography";
import SearchBlock from "../../components/blocks/SearchBlock";
import UserTeam from "./UserTeam/UserTeam";
import PageTitleBox from "../../components/blocks/PageTitleBox";
import {
  setSearchQuery,
  setSearchType,
  setUsersData,
} from "../../data/redux/userDirectory/userDirectoryActions";
import UserDirectorySearchTypes from "../../data/constants/UserDirectorySearchTypes";
import UserBadgesSearchModal from "./UserSearch/badgeSearch/UserBadgesSearchModal";
import Button from "@material-ui/core/Button";
import useDebouncedChangeHandler from "../../hooks/useDebouncedChangeHandler";

const useStyles = makeStyles((theme) => ({
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  badgesSearchButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("xl")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(2),
    },
  },
  gradientPaper: {
    backgroundImage: theme.palette.background.gradient,
  },
}));

const useSearchUserDirectory = (setUsersData, setSearchQuery) => {
  const [executeSearch, {error, loading, data}] = useLazyQuery(
    SEARCH_USER_DIRECTORY,
    {
      onCompleted: (data) => {
        setUsersData(data.search_user_directory);
      },
      onError: (error) => {
        setSearchQuery("");
        if (error.message.toLowerCase() === "bad permission") {
          //signout FIXME
          // oktaAuth.signOut();
        }
      },
    },
  );
  return [executeSearch, {error, loading, data}];
};

const UserDirectoryPageContent = ({
  searchQuery,
  setSearchQuery,
  setUsersData,
  searchType,
  setSearchType,
}) => {
  const classes = useStyles();
  const {permUserDirectoryView} = useContext(AuthUserContext);
  const [filterOpen, setFilterOpen] = useState(false);
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [open, setOpen] = useState(false);

  const [executeSearch, {loading, data}] = useSearchUserDirectory(
    setUsersData,
    setSearchQuery,
  );

  useEffect(() => {
    setOpen(open => open === !!searchQuery?.length ? open : !!searchQuery?.length);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery?.length) {
      executeSearch({
        variables: {search: {query: searchQuery, type: searchType}},
      });
    }
  }, [searchQuery, searchType, executeSearch]);

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handleBadgeSearchModalOpen = useCallback(() => {
    setBadgeModalOpen(true);
  }, []);

  const handleBadgeSearchModalClose = useCallback(() => {
    setBadgeModalOpen(false);
  }, []);

  const debouncedChangeHandler = useDebouncedChangeHandler(setSearchQuery);

  return (
    <Page title="User Directory | LPSYNC">
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"USER DIRECTORY"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="User Directory" className={classes.headerBox} />

        {permUserDirectoryView && (
          <>
            <Box mt={3}>
              <PaperCardWrapper className={classes.gradientPaper}>
                <Box className={classes.searchBox}>
                  <UserToolbarTypography white title="User Search" />

                  <SearchBlock
                    searchQuery={searchQuery}
                    handleChange={debouncedChangeHandler}
                    searchProps={{
                      id: "employee-search-text-field",
                      label: "Search by Name, Email, Job Title, Department, Location, Badges, Cost Center, or HRIS ID",
                      handleClose: () => setOpen(false)
                    }}
                    searchType={searchType}
                    setSearchType={setSearchType}
                    types={UserDirectorySearchTypes}
                    handleFilterClick={handleFilterClick}
                    isFilterApplied={isFilterApplied}
                  />
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleBadgeSearchModalOpen}
                      className={classes.badgesSearchButton}
                    >
                      Badge Search
                    </Button>
                  </Box>
                </Box>
                {searchQuery?.length > 0 && (
                  <UserDirectoryFilterBlock
                    filterOpen={filterOpen}
                    data={data}
                    setIsFilterApplied={setIsFilterApplied}
                  />
                )}
              </PaperCardWrapper>
            </Box>
            <Box height={20} width={"100%"} />
            {open ? (
              <UserDirectoryTable loading={loading} />
            ) : (
              <UserTeam />
            )}
          </>
        )}
      </Box>

      <UserBadgesSearchModal
        setOpen={setOpen}
        open={badgeModalOpen}
        handleClose={handleBadgeSearchModalClose}
      />
    </Page>
  );
};

export default connect(
  (state) => ({
    searchQuery: state.userDirectory.get("searchQuery"),
    searchType: state.userDirectory.get("searchType"),
  }),
  {setSearchQuery, setUsersData, setSearchType},
)(memo(UserDirectoryPageContent));
