import React, {memo, useContext, useEffect, useState} from "react";
import {Box, Typography} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {useQuery} from "@apollo/client";
import Page from "../../components/Page";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import {AuthUserContext} from "../../AuthUserContextProvider";
import NoPermissionsError from "../../components/NoPermissionsError";
import CandidateRequestPageContent from "./CandidateRequestPageContent";
import InfoBlock from "../../components/InfoBlock";
import {GET_COMPLETED_REQUISITIONS_BY_USER} from "../../operations/queries/getCompletedRequisitionsByUser";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import BreadcrumbLink from "../../components/breadcrumbs/BreadcrumbLink";
import PageTitleBox from "../../components/blocks/PageTitleBox";

const CandidateRequestPage = () => {
  const {
    permOnboardingAll,
    permOnboardingTeam,
    permOnboardingRequisitionBypass,
  } = useContext(AuthUserContext);
  const [viewCandidateRequest, setViewCandidateRequest] = useState(false);

  useEffect(() => {
    if (permOnboardingAll || permOnboardingTeam) {
      setViewCandidateRequest(true);
    }
  }, [permOnboardingAll, permOnboardingTeam]);

  const {data} = useQuery(GET_COMPLETED_REQUISITIONS_BY_USER, {});

  return (
    <Page title="Candidate Request | LPSYNC">
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"CANDIDATE REQUEST"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="Candidate Request" />

        {viewCandidateRequest ? (
          <>
            {!permOnboardingRequisitionBypass && (
              <>
                {data?.get_completed_requisitions_by_user?.length === 0 && (
                  <Box mb={2}>
                    <Alert severity="warning" variant="outlined">
                      You cannot make a candidate request because you do not
                      have any approved requisitions. <br />
                      Please request a requisition here:{" "}
                      <BreadcrumbLink
                        href={FrontendRoutes.REQUISITION_REQUEST}
                        title={"Requisition Request Page"}
                      />
                    </Alert>
                  </Box>
                )}
              </>
            )}
            {(permOnboardingRequisitionBypass ||
              data?.get_completed_requisitions_by_user?.length > 0) && (
              <InfoBlock type={"info"}>
                <Typography component={"div"} variant="p">
                  You are making a candidate request.{" "}
                  {!permOnboardingRequisitionBypass &&
                    "All candidate types will need to be linked to a requisition request."}{" "}
                  Once the request is submitted it will need to be approved by
                  IT/HR team. Any hardware requests are subject to approval and
                  ten working days.
                  {/* <Link className={classes.link}> See more information here. </Link>  */}
                </Typography>
              </InfoBlock>
            )}
            <CandidateRequestPageContent />
          </>
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default memo(CandidateRequestPage);
