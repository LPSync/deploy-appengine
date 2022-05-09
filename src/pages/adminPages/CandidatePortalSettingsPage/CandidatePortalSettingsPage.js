import React, {memo, useContext, useMemo, useState} from "react";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import {Box} from "@material-ui/core";
import CandidatePortalLaptopSettingsContent from "./CandidatePortalSettingsContent";
import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../../components/NoPermissionsError";
import Page from "../../../components/Page";
import PageTitleBox from "../../../components/blocks/PageTitleBox";
import AdminTabsPaper from "../../../components/tabs/AdminTabsPaper";
import CandidatePortalAccessContent from "./CandidatePortalAccessContent";

const tabName = "candidate-portal-setting";

const CandidatePortalSettingsPage = () => {
  const {permSysMgmtCandidatePortalAccess} = useContext(AuthUserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const candidatePortalSettingsTabs =  useMemo(() => [
    {
      label: "Candidate Portal Settings",
      content: <CandidatePortalLaptopSettingsContent/>,
    },
    {
      label: "Candidate Portal Access",
      content: <CandidatePortalAccessContent/>,
    },
  ], []);

  return (
    <Page title="Candidate Portal Admin | LPSYNC">
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"CANDIDATE PORTAL ADMIN"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="Candidate Portal Admin" />

          {permSysMgmtCandidatePortalAccess ? (
            <Box mt={3} minWidth={1050}>
             <AdminTabsPaper
               value={value}
               handleChange={handleChange}
               tabs={candidatePortalSettingsTabs}
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

export default memo(CandidatePortalSettingsPage);
