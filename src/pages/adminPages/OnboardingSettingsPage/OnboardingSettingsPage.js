import React, {memo, useContext, useMemo, useState} from "react";
import {Box} from "@material-ui/core";
import Page from "../../../components/Page";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../../components/NoPermissionsError";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import OnboardingDelegates from "./OnboardingDelegates";
import PageTitleBox from "../../../components/blocks/PageTitleBox";
import OnboardingRequest from "./OnboardingRequest";
import AdminTabsPaper from "../../../components/tabs/AdminTabsPaper";

const tabName = "vertical";

const OnboardingSettingsPage = () => {
  const {permSysMgmtSettingsOnboarding} = useContext(AuthUserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onboardingSettingsTabs = useMemo(() => [
    {
      label: "Onboarding Delegates",
      content: <OnboardingDelegates />,
    },
    {
      label: "Onboarding Request",
      content: <OnboardingRequest />,
    },
  ], []);

  return (
    <Page title="Onboarding Settings | LPSYNC">
      <BreadcrumbHomeBox admin>
        <BreadcrumbText title={"ONBOARDING SETTINGS"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="Onboarding Settings" />

        {permSysMgmtSettingsOnboarding ? (
          <Box mt={3} minWidth={1050}>
            <AdminTabsPaper
              value={value}
              handleChange={handleChange}
              tabs={onboardingSettingsTabs}
              tabName={tabName}
            />
          </Box>
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default memo(OnboardingSettingsPage);
