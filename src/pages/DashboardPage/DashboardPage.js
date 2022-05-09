import React, { useContext } from "react";
import { Box, Container } from "@material-ui/core";
import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../components/NoPermissionsError";
import { AuthUserContext } from "../../AuthUserContextProvider";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";

const DashboardPage = () => {
  const { permDashboardView } = useContext(AuthUserContext);

  return (
    <Page title="Dashboard | LPSYNC">
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"DASHBOARD"} />
      </BreadcrumbHomeBox>
      {permDashboardView ? (
        <Container>
          <Box my={2}>
            <PageTitle>Dashboard</PageTitle>
          </Box>
        </Container>
      ) : (
        <NoPermissionsError />
      )}
    </Page>
  );
};

export default DashboardPage;
