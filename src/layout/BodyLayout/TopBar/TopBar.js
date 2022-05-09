import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import {
  AppBar,
  Box,
  Button,
  Hidden,
  IconButton,
  LinearProgress,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import {GET_AUTH_USER} from "../../../operations/queries/getAuthUser";
import {CREATE_LOG_ENTRY} from "../../../operations/mutations/createLogEntry";
import {GET_USER_ROLES_BY_USER_ID} from "../../../operations/queries/getUserRolesByUserId";
import {GET_DIRECT_REPORTS} from "../../../operations/queries/getDirectReports";
import {useHistory, useRouteMatch} from "react-router-dom";
import handleError from "../../../data/handleError";
import FrontendRoutes, {
  AdminRoutes,
} from "../../../data/constants/FrontendRoutes";
import {
  isAuthExpired,
  removeAuthExpireDateTime,
  setAuthExpireDateTimeToStorage,
} from "../../../data/helper/storageHelpers";
import BrandIcon from "./BrandIcon";
import PowerSettingPopover from "./PowerSettingPopover";
import FeedbackPopover from "./FeedbackPopover";
import {UPDATE_USER_LAST_LOGIN} from "../../../operations/mutations/updateUserLastLogin";
import CustomModal from "../../../components/modals/CustomModal";
import SplashModal from "./SplashModalContent";
import {CHECK_IF_AUTH_SPLASH_SCREEN_COMPLETED} from "../../../operations/queries/checkIfAuthSplashScreenCompleted";
import GlobalSearchBlock from "../GlobalSearchBlock";
import CustomIcon from "../../../components/CustomIcon";
import usePermissions from "../../../hooks/usePermissions";
import useTopBarSnackbar from "../../../hooks/useTopBarSnackbar";

const publicIp = require("public-ip");
const isStaging = process.env.REACT_APP_ENVIRONMENT === "staging";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "linear-gradient(45deg, #1d1f52 30%, #162036 90%)",
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuItem: {
    fontSize: ".9rem",
  },
  commentIcon: {
    fontSize: "1.5rem",
  },
  topBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userNameButton: {
    textTransform: "none",
  },
}));

const TopBar = ({className, onMobileNavOpen, ...rest}) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    authUser,
    permUserDirectoryView,
    setAuthUser,
    setAuthUserPermissions,
    isPageLoading,
    setAuthUserDirectReports,
  } = useContext(AuthUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorRef = useRef(null);
  const [isSplashOpen, setIsSplashOpen] = useState(false);

  useQuery(GET_AUTH_USER, {
    onCompleted: (data) => setAuthUser(data.get_auth_user),
    onError: (error) => handleError(error)(history),
  });

  useQuery(GET_USER_ROLES_BY_USER_ID, {
    onCompleted: (data) => savePermissions(data.get_user_roles_by_user_id),
    onError: (error) => handleError(error)(history),
  });

  useQuery(CHECK_IF_AUTH_SPLASH_SCREEN_COMPLETED, {
    onCompleted: (data) => {
      if (!data?.check_if_auth_splash_screen_completed?.splashScreenCompleted) {
        setIsSplashOpen(true);
      }
    },
    onError: (error) => handleError(error)(history),
  });

  const [executeReportsSearch] = useLazyQuery(GET_DIRECT_REPORTS, {
    onCompleted: (data) => setAuthUserDirectReports(data.get_direct_reports),
    onError: (error) => handleError(error)(history),
  }); // TODO do we need this here? switch to nonFte

  const [updateUserLastLogin] = useMutation(UPDATE_USER_LAST_LOGIN, {
    onError: (error) => handleError(error)(history),
  });

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const logUserAuthenticated = async() => {
    await updateUserLastLogin();
    if (isAuthExpired()) {
      setAuthExpireDateTimeToStorage();
      if (process.env.NODE_ENV === "production") {
        // todo check for staging
        const ipAddress = await publicIp.v4();
        createLog(
          "info",
          `User Authenticated >> infoMsg: Success. ipAddress: ${ipAddress}`,
        );
      }
    }
  };

  useEffect(() => {
    if (authUser) {
      executeReportsSearch({variables: {search: authUser.profile.email}});
      logUserAuthenticated();
    }
  }, [authUser]);

  const savePermissions = async(data) => {
    let permissions = [];

    await data?.forEach((userRole) => {
      userRole.role.permissions.map((perm) =>
        permissions.push(perm.permissionId),
      );
    });
    const permissionsSet = [...new Set(permissions)];

    setAuthUserPermissions(permissionsSet);
  };

  const createLog = useCallback(
    (info, description) => {
      createLogEntry({
        variables: {
          input: {
            logType: "Authentication",
            logNotification: info,
            logDescription: description,
          },
        },
      });
    },
    [createLogEntry],
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async() => {
    await createLog("info", "User Authenticated >> infoMsg: User logged out.");
    removeAuthExpireDateTime();
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    window.location.href = "https://hub.liveperson.com/app/UserHome";
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prevOpen) => !prevOpen);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(isMenuOpen);
  useEffect(() => {
    if (prevOpen.current === true && isMenuOpen === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = isMenuOpen;
  }, [isMenuOpen]);

  const isAdmin = useRouteMatch(AdminRoutes.ADMIN);
  const title = isAdmin ? (isStaging ? "Admin - Staging" : "Admin") : "Staging";

  usePermissions();
  useTopBarSnackbar();

  return (
    <>
      <AppBar
        className={`${classes.root} ${className}`}
        postion="sticky"
        elevation={1}
        {...rest}
      >
        <Toolbar className={classes.toolbar}>
          <Box className={classes.topBlock}>
            <BrandIcon />
            <Hidden lgUp>
              <IconButton color="inherit" onClick={onMobileNavOpen}>
                <MenuIcon />
              </IconButton>
            </Hidden>
            {(isStaging || isAdmin) && (
              <Box ml={3}>
                <Typography component={"div"}>{title}</Typography>
              </Box>
            )}
          </Box>


          <Box className={classes.topBlock}>
            {permUserDirectoryView && (
                <GlobalSearchBlock />
            )}
            {isPageLoading ? (
              <Typography component={"div"}>Loading permissions...</Typography>
            ) : (
              authUser && (
                <Button className={classes.userNameButton}
                        onClick={() => history.push(FrontendRoutes.USER_DIRECTORY_PROFILE(authUser?.profile.userName))}
                >
                  <Typography component={"div"} variant={"h5"}>
                    {authUser.profile.firstName + " " + authUser.profile.lastName}
                  </Typography>
                </Button>
              )
            )}
            {!isAdmin && (
              <Button
                ref={anchorRef}
                aria-controls={isMenuOpen ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleMenuToggle}
              >
                <CustomIcon
                  alt="feedback-icon"
                  src={"/images/messages-bubble-edit-streamline.png"}
                />
              </Button>
            )}
            <IconButton onClick={handleClick}>
              <CustomIcon
                alt="power-button-icon"
                src={"/images/power-button-streamline.png"}
              />
            </IconButton>
          </Box>
          {!isAdmin && (
            <FeedbackPopover
              anchorCur={anchorRef.current}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          )}
          <PowerSettingPopover
            anchorEl={anchorEl}
            handleClose={handleClose}
            logout={logout}
          />
        </Toolbar>
        {isPageLoading && <LinearProgress color="secondary" />}
      </AppBar>
      <CustomModal open={isSplashOpen} large>
        <SplashModal
          name={authUser?.profile?.firstName}
          email={authUser?.profile?.email}
          setIsSplashOpen={setIsSplashOpen}
        />
      </CustomModal>
    </>
  );
};


export default memo(TopBar);
