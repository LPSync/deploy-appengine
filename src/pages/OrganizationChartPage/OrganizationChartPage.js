import React, {memo, useContext, useEffect, useState} from "react";
import {Box, makeStyles} from "@material-ui/core";
import Page from "../../components/Page";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import LoadingLogo from "../../components/LoadingLogo";
import {AuthUserContext} from "../../AuthUserContextProvider";
import BalkanOrgChart from "./BalkanOrgChart";
import NoPermissionsError from "../../components/NoPermissionsError";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import {useQuery} from "@apollo/client";
import {GET_ALL_OKTA_USERS} from "../../operations/queries/getAllOktaUsers";
import handleError from "../../data/handleError";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {
  DEPARTMENT_LABEL,
  DIRECT_REPORTS_CONTRACTOR_LABEL,
  DIRECT_REPORTS_FULL_TIME_LABEL,
  DIRECT_REPORTS_PARTNER_LABEL,
  DIRECT_REPORTS_TOTAL_LABEL,
  EMAIL_LABEL,
  EMPLOYEE_TYPE_LABEL,
  ID_LABEL,
  IMG_LABEL,
  LINK_LABEL,
  LOCATION_LABEL,
  NAME_LABEL,
  PID_LABEL,
  TAGS_LABEL,
  TITLE_LABEL,
} from "../../data/constants/OrgChart";

const useStyles = makeStyles(() => ({
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
  },
}));

const OrganizationChartPage = ({email}) => {
  const classes = useStyles();
  const history = useHistory();
  const {permOrgChartView} = useContext(AuthUserContext);
  const [display, setDisplay] = useState(false);
  const [nodesList, setNodesList] = useState([]);
  const [isChartReady, setIsChartReady] = useState(false);

  useQuery(GET_ALL_OKTA_USERS, {
    onCompleted: (data) => {
      getNodes(data.get_all_okta_users);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    setDisplay(true);
    return () => setDisplay(false);
  }, []);

  const getNodes = async (allData) => {
    const allObj = [
      {
        [ID_LABEL]: 0,
        [NAME_LABEL]: "LivePerson",
        [TITLE_LABEL]: "",
        [IMG_LABEL]:
          "https://storage.googleapis.com/lpsync/orange_lp_symbol_logo.png",
      },
    ];

    await allData?.forEach((data) => {
      const mgrId = data.managerOktaId
        ? data.managerOktaId
        : "00u1wd2tyuFt34lFn2p6";

      const drTotal =
        data.totalDirectReports === 0 ? "IC" : data.totalDirectReports;

      const userPhoto = data.photo ? data.photo : "/images/silhouette.jpeg";

      const obj = {
        [ID_LABEL]: data.id,
        [PID_LABEL]: mgrId,
        [TAGS_LABEL]: [data.employeeType],
        [IMG_LABEL]: userPhoto,
        [NAME_LABEL]: `${data.firstName} ${data.lastName}`,
        [TITLE_LABEL]: data.jobTitle,
        [EMAIL_LABEL]: data.email,
        [DEPARTMENT_LABEL]: data.department,
        [LOCATION_LABEL]: data.location,
        [EMPLOYEE_TYPE_LABEL]: data.employeeType,
        [LINK_LABEL]: data.userName,
        [DIRECT_REPORTS_TOTAL_LABEL]: drTotal,
        [DIRECT_REPORTS_FULL_TIME_LABEL]: data.totalFullTimeDirects,
        [DIRECT_REPORTS_CONTRACTOR_LABEL]: data.totalContractorDirects,
        [DIRECT_REPORTS_PARTNER_LABEL]: data.totalPartnerDirects,
      };

      allObj.push(obj);
    });

    setNodesList(allObj);
    setIsChartReady(true);
  };

  return (
    <Page title="Organization Chart | LPSYNC">
      <Box mt={1} ml={1}>
        <BreadcrumbHomeBox>
          <BreadcrumbText title={"ORGANIZATION CHART"} />
        </BreadcrumbHomeBox>
      </Box>
      <Box ml={2}>
        {permOrgChartView ? (
          <Box className={`${!isChartReady ? classes.loadingBox : ""}`}>
            {!isChartReady && display ? (
              <LoadingLogo />
            ) : (
              <BalkanOrgChart nodes={nodesList} email={email} />
            )}
          </Box>
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default connect(
  (state) => ({email: state.common.get("orgChartEmail")}),
  {}
)(memo(OrganizationChartPage));
