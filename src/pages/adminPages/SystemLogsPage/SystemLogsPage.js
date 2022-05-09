import React, {memo, useContext} from "react";
import {Box, Paper} from "@material-ui/core";
import Page from "../../../components/Page";
import NoPermissionsError from "../../../components/NoPermissionsError";
import SystemsLogsTable from "./SystemsLogsContent";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import PageTitleBox from "../../../components/blocks/PageTitleBox";

const SystemLogsPage = () => {
  const { permSysMgmtLogs } = useContext(AuthUserContext);

  return (
    <Page title="User Management | LPSYNC">
      <BreadcrumbHomeBox admin>
        <BreadcrumbText title={"SYSTEM LOGS"}/>
      </BreadcrumbHomeBox>

      {permSysMgmtLogs ? (
        <Box mx={3}>
          <PageTitleBox title="SYSTEM LOGS"/>

          <Box mt={3} minWidth={1050}>
            <Paper elevation={3}>
              <SystemsLogsTable/>
            </Paper>
          </Box>
        </Box>
      ) : (
        <NoPermissionsError/>
      )}
    </Page>
  );
};

export default memo(SystemLogsPage);
