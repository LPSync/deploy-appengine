import React, {memo, useContext} from "react";
import {Box, Typography} from "@material-ui/core";
import Page from "../../components/Page";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import {AuthUserContext} from "../../AuthUserContextProvider";
import NoPermissionsError from "../../components/NoPermissionsError";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import InfoBlock from "../../components/InfoBlock";
import PageTitleBox from "../../components/blocks/PageTitleBox";
import OffboardRequestPageContent from "./OffboardRequestPageContent";

const OffboardRequestPage = () => {
  const {permOffboardingAll, permOffboardingTeam} = useContext(AuthUserContext);

  return (
    <Page title="Offboard Request | LPSYNC">
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"OFFBOARD REQUEST"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="Offboard Request" />

        {permOffboardingAll || permOffboardingTeam ? (
          <>
            <InfoBlock type={"info"}>
              <Typography component={"div"} variant="p">
                You are creating an offboarding request for an existing active
                employee. Please ensure that all of the information is completed
                accurately. All offboarding requests are subject to approval.
              </Typography>
            </InfoBlock>

            <OffboardRequestPageContent />
          </>
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default memo(OffboardRequestPage);
