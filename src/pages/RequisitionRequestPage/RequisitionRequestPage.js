import React, {memo, useContext, useEffect, useState} from "react";
import {Box, Typography} from "@material-ui/core";
import Page from "../../components/Page";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../components/NoPermissionsError";
import {AuthUserContext} from "../../AuthUserContextProvider";
import RequisitionRequestContextProvider from "./RequisitionRequestContextProvider";
import RequisitionRequestPageContent from "./RequisitionRequestPageContent";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import InfoBlock from "../../components/InfoBlock";
import PageTitleBox from "../../components/blocks/PageTitleBox";

const RequisitionRequestPage = () => {
  const {permRequisitionAll} = useContext(AuthUserContext);
  const [viewRequisition, setViewRequisition] = useState(false);

  useEffect(() => {
    if (permRequisitionAll) {
      setViewRequisition(true);
    }
  }, [permRequisitionAll]);

  return (
    <RequisitionRequestContextProvider>
      <Page title="Requisition Request | LPSYNC">
        <BreadcrumbHomeBox>
          <BreadcrumbText title={"REQUISITION REQUEST"} />
        </BreadcrumbHomeBox>

        <Box mx={3}>
          <PageTitleBox title="Requisition Request" />

          {viewRequisition ? (
            <>
              <InfoBlock type={"info"}>
                <Typography component={"div"} variant="p">
                  A requisition request is required for all candidate types. All
                  requests will need to be approved by the Finance team.
                  <br />
                  Once approved, you will be able to onboard a candidate against
                  the requisition.
                </Typography>
              </InfoBlock>
              <RequisitionRequestPageContent />
            </>
          ) : (
            <NoPermissionsError />
          )}
        </Box>
      </Page>
    </RequisitionRequestContextProvider>
  );
};

export default memo(RequisitionRequestPage);
