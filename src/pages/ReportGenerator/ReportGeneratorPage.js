import React, {memo, useContext} from "react";
import {AuthUserContext} from "../../AuthUserContextProvider";
import {Box} from "@material-ui/core";
import ReportGeneratorPageContent from "./ReportGeneratorPageContent";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../components/NoPermissionsError";
import Page from "../../components/Page";
import PageTitleBox from "../../components/blocks/PageTitleBox";

const ReportGeneratorPage = () => {
  const { permReportGeneratorView } = useContext(AuthUserContext);

  return (
    <Page title="Report Generator | LPSYNC">
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"REPORT GENERATOR"} />
      </BreadcrumbHomeBox>

      <Box mr={2} ml={2}>
        <PageTitleBox title="Report Generator"/>

        {permReportGeneratorView ? (
          <ReportGeneratorPageContent />
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default memo(ReportGeneratorPage);
