import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {Box, makeStyles} from "@material-ui/core";
import Page from "../../../components/Page";
import BreadcrumbLink from "../../../components/breadcrumbs/BreadcrumbLink";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import {GET_GOOGLE_USER_INFO} from "../../../operations/queries/getGoogleUserInfo";
import {GET_GOOGLE_USER_IMG} from "../../../operations/queries/getGoogleUserImg";
import {GET_USER_BY_EMAIL} from "../../../operations/queries/getUserByEmail";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import {GET_LPSYNC_USER_BADGES} from "../../../operations/queries/getLpsyncUserBadges";
import UserInformation from "./UserInformation";
import ItInformation from "./ItInformation";
import FinanceInformation from "./FinanceInformation";
import NonFteAudit from "./NonFteAudit";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import handleError from "../../../data/handleError";
import UserProfileInfo from "./UserProfileInfo";
import Badges from "./Badges";
import {
  setGoogleUserInfo,
  setUserBadges,
  setUserData,
  setUserDirectReports,
} from "../../../data/redux/userDirectory/userDirectoryActions";
import UserLoadingCircle from "../UserTeam/UserLoadingCircle";
import TopTypography from "../../../components/typographies/TopTypography";
import TabsPaper from "../../../components/tabs/TabsPaper";
import UserProfileSearch from "./UserProfileSearch";

const useStyles = makeStyles((theme) => ({
  tabPanel: {
    height: "50vh",
    overflow: "auto",
  },
  tabBox: {
    height: "100%",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const getUserEmail = (userName) => {
  if (userName?.includes("@")) {
    return userName;
  } else {
    return `${userName}@liveperson.com`;
  }
};

const getUserProfileTabs = (
  permUserDirectoryFinanceView,
  viewNonFteTab,
  permUserDirectoryItDetailsView,
  handleBadgeQuery
) =>
  [
    {
      label: "User Information",
      content: <UserInformation />,
    },
    {
      label: "Badges",
      content: <Badges handleBadgeQuery={handleBadgeQuery} />,
    },
    permUserDirectoryFinanceView && {
      label: "Finance Information",
      content: <FinanceInformation />,
    },
    viewNonFteTab && {
      label: "Non-FTE Audit",
      content: <NonFteAudit />,
    },
    permUserDirectoryItDetailsView && {
      label: "IT Information",
      content: <ItInformation />,
    },
  ]?.filter(Boolean);

const tabName = "scrollable-auto";

const UserProfile = () => {
  const classes = useStyles();
  let {userName} = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const userEmail = useSelector(
    (state) => state?.userDirectory?.get("userData")?.profile?.email
  );
  const {
    authUser,
    permUserDirectoryFinanceView,
    permUserDirectoryItDetailsView,
    permUserDirectoryNonFteAudit,
  } = useContext(AuthUserContext);
  const [activeTab, setActiveTab] = useState(0);
  const [viewNonFteTab, setViewNonFteTab] = useState(false);
  const location = useLocation();

  const [executeSearch, {data, loading}] = useLazyQuery(GET_USER_BY_EMAIL, {
    onError: (error) => handleError(error)(history),
  });

  const [executeGoogleUserSearch, {data: gData, loading: gLoading}] =
    useLazyQuery(GET_GOOGLE_USER_INFO, {
      onCompleted: (data) =>
        dispatch(setGoogleUserInfo(data.get_google_user_info)),
      onError: (error) => handleError(error)(history),
    });

  const [executeGoogleUserImgSearch, {data: imgData, loading: imgLoading}] =
    useLazyQuery(GET_GOOGLE_USER_IMG, {
      onError: (error) => handleError(error)(history),
    });

  const [executeBadgesSearch] = useLazyQuery(GET_LPSYNC_USER_BADGES, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      dispatch(setUserBadges(data?.get_lpsync_user_badges));
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if(data) {
      dispatch(setUserData(data?.get_user_by_email?.[0]));
    }
  }, [data, dispatch]);

  const handleBadgeQuery = useCallback(
    (email) => {
      executeBadgesSearch({
        variables: {user: email || userEmail},
      });
    },
    [userEmail, executeBadgesSearch]
  );

  useEffect(() => {
    dispatch(setUserDirectReports());
    setActiveTab(0);
  }, [location, dispatch]);

  useEffect(() => {
    if (authUser?.profile?.userName) {
      setViewNonFteTab(
        permUserDirectoryNonFteAudit && userName === authUser.profile.userName
      );
    }
  }, [authUser, permUserDirectoryNonFteAudit, userName]);

  useEffect(() => {
    if (userName) {
      const query = getUserEmail(userName);
      executeSearch({
        variables: {search: query},
      });
      executeGoogleUserSearch({
        variables: {search: query},
      });
      executeGoogleUserImgSearch({
        variables: {search: query},
      });
      handleBadgeQuery(query);
    }
  }, [userName]);

  const handleTabsChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  const useProfileTabs = useMemo(
    () =>
      getUserProfileTabs(
        permUserDirectoryFinanceView,
        viewNonFteTab,
        permUserDirectoryItDetailsView,
        handleBadgeQuery
      )?.map((tab) => ({
        ...tab,
        content: <Box className={classes.tabBox}> {tab?.content} </Box>,
      })),
    [
      permUserDirectoryFinanceView,
      viewNonFteTab,
      permUserDirectoryItDetailsView,
      handleBadgeQuery,
    ]
  );

  const user = data?.get_user_by_email?.[0];

  return (
    <Page title={`${userName.toUpperCase()} | User Directory | LPSYNC`}>
      <BreadcrumbHomeBox>
        <BreadcrumbLink
          href={FrontendRoutes.USER_DIRECTORY}
          title={"USER DIRECTORY"}
        />
        <BreadcrumbText title={`${userName.toUpperCase()}`} />
      </BreadcrumbHomeBox>
      <Box mx={3}>
        <Box minWidth={1050}>
          <UserProfileSearch />

          {loading || gLoading || imgLoading ? (
            <UserLoadingCircle text={"Loading user details..."} />
          ) : user && imgData && gData ? (
            <>
              <UserProfileInfo
                profile={user.profile}
                image={imgData.get_google_user_img?.photoData}
              />

              <Box minWidth={1050}>
                <TabsPaper
                  value={activeTab}
                  handleChange={handleTabsChange}
                  tabs={useProfileTabs}
                  tabName={tabName}
                  tabPanelClasses={classes.tabPanel}
                  aria-label="user profile tabs navigation"
                  styled
                />
              </Box>
            </>
          ) : (
            <TopTypography>User Not Found</TopTypography>
          )}
        </Box>
      </Box>
    </Page>
  );
};

export default memo(UserProfile);
