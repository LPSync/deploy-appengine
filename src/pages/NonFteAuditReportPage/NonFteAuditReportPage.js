import React, { memo, useContext, useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import Page from "../../components/Page";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../components/NoPermissionsError";
import NonFteAuditReportContextProvider from "./NonFteAuditReportContextProvider";
import NonFteAuditReportPageContent from "./NonFteAuditReportPageContent";
import { AuthUserContext } from "../../AuthUserContextProvider";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import PageTitleBox from "../../components/blocks/PageTitleBox";

const NonFteAuditReportPage = () => {
  const { permReportNonFteAudit } = useContext(AuthUserContext);
  const [viewNonFteAuditReportPage, setViewNonFteAuditReportPage] = useState(
    false
  );

  useEffect(() => {
    if (permReportNonFteAudit) {
      setViewNonFteAuditReportPage(true);
    }
  }, [permReportNonFteAudit]);
  return (
    <NonFteAuditReportContextProvider>
      <Page title="Non-FTE Audit Report | LPSYNC">
        <BreadcrumbHomeBox>
          <BreadcrumbText title={"NON-FTE AUDIT REPORT"}/>
        </BreadcrumbHomeBox>

        <Box mx={3}>
          <PageTitleBox title="Non-FTE Audit Report"/>

          {viewNonFteAuditReportPage ? (
            <NonFteAuditReportPageContent/>
          ) : (
            <NoPermissionsError/>
          )}
        </Box>
      </Page>
    </NonFteAuditReportContextProvider>
  );
};

export default memo(NonFteAuditReportPage);
