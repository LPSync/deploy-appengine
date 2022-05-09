import React, {memo, useContext} from "react";
import {Box, Button, Paper} from "@material-ui/core";
import Page from "../../../components/Page";
import NoPermissionsError from "../../../components/NoPermissionsError";
import RoleManagement from "./RoleManagement/RoleManagement";
import {UserManagementContext} from "./UserManagementContextProvider";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import PageTitleBox from "../../../components/blocks/PageTitleBox";

const UserManagementPageContent = () => {
  const { isAddEditOpen, setIsAddEditOpen } = useContext(UserManagementContext);
  const { permSysMgmtManage } = useContext(AuthUserContext);

  return (
    <Page title="User Management | LPSYNC">
      <BreadcrumbHomeBox admin>
        {isAddEditOpen ? (
          <>
            <Button size="small" onClick={() => setIsAddEditOpen(false)}>
              USER MANAGEMENT
            </Button>
            <BreadcrumbText title={"ADD ROLE"}/>
          </>
        ) : (
          <BreadcrumbText title={"USER MANAGEMENT"}/>
        )}
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="User Management"/>

        {permSysMgmtManage ? (
          <Box mt={3} minWidth={1050}>
            <Paper elevation={3}>
              <RoleManagement/>
            </Paper>
          </Box>
        ) : (
          <NoPermissionsError/>
        )}
      </Box>
    </Page>
  );
};

export default memo(UserManagementPageContent);
