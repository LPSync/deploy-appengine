import React, {memo, useContext, useMemo, useState} from "react";
import {Box} from "@material-ui/core";
import HrTerminationCodes from "./HrTerminationCodes/HrTerminationCodes";
import Page from "../../../components/Page";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../../components/NoPermissionsError";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import PageTitleBox from "../../../components/blocks/PageTitleBox";
import AdminTabsPaper from "../../../components/tabs/AdminTabsPaper";

const tabName = "vertical";

const OffboardingSettingsPage = () => {
  const { permSysMgmtSettingsOffboarding } = useContext(AuthUserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const offboardingSettingsTabs = useMemo(() => [
    {
      label: "HR Termination Codes",
      content: <HrTerminationCodes />,
    },
  ], []);

  return (
    <Page title="Offboarding Settings | LPSYNC">
      <BreadcrumbHomeBox admin>
        <BreadcrumbText title={"OFFBOARDING SETTINGS"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="Offboarding Settings" />

        {permSysMgmtSettingsOffboarding ? (
          <Box mt={3} minWidth={1050}>
            <AdminTabsPaper
              value={value}
              handleChange={handleChange}
              tabs={offboardingSettingsTabs}
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

export default memo(OffboardingSettingsPage);
