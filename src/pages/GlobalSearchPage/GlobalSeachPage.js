import React, { memo, useContext } from "react";
import { Box } from "@material-ui/core";
import Page from "../../components/Page";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import PageTitleBox from "../../components/blocks/PageTitleBox";
import NoPermissionsError from "../../components/NoPermissionsError";
import { AuthUserContext } from "../../AuthUserContextProvider";
import GlobalSearchContent from "./GlobalSearchContent";

const GlobalSearchPage = () => {
  const { permUserDirectoryView } = useContext(AuthUserContext);

  return (
    <Page title="Global Search | LPSYNC">
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"GLOBAL SEARCH"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="Global Search" />

        {permUserDirectoryView ? (
          <GlobalSearchContent />
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default memo(GlobalSearchPage);