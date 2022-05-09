import React, {memo, useContext} from "react";
import {Box, Typography} from "@material-ui/core";
import Page from "../../components/Page";
import OffboardEmployeeContextProvider from "./OffboardEmployeeContextProvider";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import {AuthUserContext} from "../../AuthUserContextProvider";
import NoPermissionsError from "../../components/NoPermissionsError";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import OffboardEmployeePageContent from "./OffboardEmployeePageContent";
import InfoBlock from "../../components/InfoBlock";
import PageTitleBox from "../../components/blocks/PageTitleBox";

const OffboardEmployeePage = () => {
  const {permOffboardingAll, permOffboardingTeam, permOffboardingNfte} =
    useContext(AuthUserContext);

  return (
    <OffboardEmployeeContextProvider>
      <Page title="Offboard Employee | LPSYNC">
        <BreadcrumbHomeBox>
          <BreadcrumbText title={"OFFBOARD EMPLOYEE"} />
        </BreadcrumbHomeBox>

        <Box mx={3}>
          <PageTitleBox title="Offboard Employee" />

          {permOffboardingAll || permOffboardingTeam || permOffboardingNfte ? (
            <>
              {(permOffboardingNfte || permOffboardingTeam) &&
                !permOffboardingAll && (
                  <InfoBlock>
                    <Typography component={"div"} variant="p">
                      In LPSync, you can only offboard
                      {permOffboardingTeam &&
                        !permOffboardingNfte &&
                        " a Non Full-Time Employee (such as a partner or a contractor) who directly reports to you. "}
                      {permOffboardingNfte &&
                        " any Non Full-Time Employee (such as a partner or a contractor). "}
                      All offboard requests for Full-Time Employees must be sent
                      to HR. All requests are subject to approval.
                    </Typography>
                  </InfoBlock>
                )}
              <OffboardEmployeePageContent />
            </>
          ) : (
            <NoPermissionsError />
          )}
        </Box>
      </Page>
    </OffboardEmployeeContextProvider>
  );
};

export default memo(OffboardEmployeePage);
