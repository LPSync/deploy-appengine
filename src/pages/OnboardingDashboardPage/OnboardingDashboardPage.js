import React, {memo, useContext} from "react";
import {Box} from "@material-ui/core";
import Page from "../../components/Page";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import {AuthUserContext} from "../../AuthUserContextProvider";
import NoPermissionsError from "../../components/NoPermissionsError";
import OnboardingDashboardPageContent from "./OnboardingDashboardPageContent";
import PageTitleBox from "../../components/blocks/PageTitleBox";

const OnboardingDashboardPage = () => {
  const {permOnboardingDashboardView} = useContext(AuthUserContext);

  return (
    <Page title="Onboarding Dashboard | LPSYNC">
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"ONBOARDING DASHBOARD"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="Onboarding Dashboard" />

        {permOnboardingDashboardView ? (
          <OnboardingDashboardPageContent />
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default memo(OnboardingDashboardPage);
