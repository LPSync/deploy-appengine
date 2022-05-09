import React, {memo, useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import {AuthUserContext} from "../../AuthUserContextProvider";
import MainContainer from "./MainContainer";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import MobileAlertPage from "./MobileAlertPage";
import {useRouteMatch} from "react-router-dom";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import useScreenDimensions from "../../hooks/useScreenDimensions";

const useStyles = makeStyles((theme) => ({
  desktopRoot: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    // overflow: "auto",
    width: "100%",
    paddingBottom: (props) => (props.orgchart ? 0 : props.request ? "2vh" : "5vh"),
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.firefox ? "none" : "flex"),
    },
  },
  mobileRoot: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  rootWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflowX: "hidden",
  },
  wrapper: {
    display: "flex",
    // flex: "1 1 auto",
    paddingTop: 64,
    overflowX: "hidden",
  },
  contentContainer: {
    flex: "1 1 auto",
    height: "100%",
    width: "inherit",
  },
}));

const BodyLayout = () => {
  const orgchart = useRouteMatch(FrontendRoutes.ORGANIZATION_CHART);
  const offboarding = useRouteMatch(FrontendRoutes.OFFBOARD_EMPLOYEE);
  const candidate = useRouteMatch(FrontendRoutes.CANDIDATE_REQUEST);
  const requisition = useRouteMatch(FrontendRoutes.REQUISITION_REQUEST);
  const request = offboarding || candidate || requisition;

  const firefox = typeof InstallTrigger !== "undefined";
  const classes = useStyles({orgchart, request, firefox});
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const {isPageLoading} = useContext(AuthUserContext);
  const {width} = useScreenDimensions();

  useEffect(() => {
    const scale = width / 1275;
    if (width < 960) {
      document.body.style.zoom = scale;
    } else {
      document.body.style.zoom = 1;
      document.body.style["-moz-transform"] = 1;
    }
  }, [width]);

  return (
    <>
      {firefox && (
        <div className={classes.mobileRoot}>
          <MobileAlertPage />
        </div>
      )}
      <div className={classes.desktopRoot}>
        <>
          <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
          {!isPageLoading && (
            <NavBar
              onMobileClose={() => setMobileNavOpen(false)}
              openMobile={isMobileNavOpen}
            />
          )}
        </>
        <div id="portal-root-id" className={classes.rootWrapper}>
          <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
              {!isPageLoading && <MainContainer />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(BodyLayout);
