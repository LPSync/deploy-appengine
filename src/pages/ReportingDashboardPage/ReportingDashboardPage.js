import React, {memo, useContext} from "react";
import {AuthUserContext} from "../../AuthUserContextProvider";
import {Box} from "@material-ui/core";
import ReportingPageContent from "./ReportingPageContent";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../components/NoPermissionsError";
import Page from "../../components/Page";
import PageTitleBox from "../../components/blocks/PageTitleBox";

const ReportingDashboardPage = () => {
  const {permReportingDashboardView} = useContext(AuthUserContext);

  return (
    <Page title="Reporting Dashboard | LPSYNC">
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"ReportingDashboardPage"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="Reporting Dashboard" />

        {permReportingDashboardView ? (
          <ReportingPageContent />
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default memo(ReportingDashboardPage);
