import React, {memo, useContext} from "react";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import {Box} from "@material-ui/core";
import SchedulerJobsPageContent from "./SchedulerJobsPageContent";
import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../../components/NoPermissionsError";
import Page from "../../../components/Page";
import PageTitleBox from "../../../components/blocks/PageTitleBox";

const SchedulerJobsPage = () => {
  const {permSysMgmtSchedulerJobs} = useContext(AuthUserContext);

  return (
    <Page title="Scheduler Jobs | LPSYNC">
      <BreadcrumbHomeBox admin>
        <BreadcrumbText title={"SCHEDULER JOBS"} />
      </BreadcrumbHomeBox>

      <Box mr={2} ml={2}>
        <PageTitleBox title="Scheduler Jobs" />

        {permSysMgmtSchedulerJobs ? (
          <SchedulerJobsPageContent />
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default memo(SchedulerJobsPage);
