import React, {memo, useContext, useEffect, useState} from "react";
import {Box, Link, Typography} from "@material-ui/core";
import Page from "../../components/Page";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import {AuthUserContext} from "../../AuthUserContextProvider";
import NoPermissionsError from "../../components/NoPermissionsError";
import MultiCandidateRequestPageContent from "./MultiCandidateRequestPageContent";
import PageTitleBox from "../../components/blocks/PageTitleBox";
import InfoBlock from "../../components/InfoBlock";

const MultiCandidateRequestPage = () => {
  const {permMultiCandidateRequestView} = useContext(AuthUserContext);
  const [viewCandidateRequest, setViewCandidateRequest] = useState(false);

  useEffect(() => {
    if (permMultiCandidateRequestView) {
      setViewCandidateRequest(true);
    }
  }, [permMultiCandidateRequestView]);

  return (
    <Page title="Multi-Candidate Onboarding Request | LPSYNC">
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"MULTI-CANDIDATE ONBOARDING REQUEST"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="Multi-Candidate Onboarding Request" />

        {viewCandidateRequest ? (
          <>
            <InfoBlock>
              <Typography component={"div"}>
                This tools allows you to import a CSV for user/candidates who
                need to be onboarded and/or sent a welcome email.
                <br />
                <Link
                  href="https://storage.googleapis.com/lpsync/files/lpsync-multi-candidate-template.csv"
                  download
                  style={{color: "black"}}
                  underline={"always"}
                >
                  Download CSV format example.
                </Link>
              </Typography>
            </InfoBlock>
            <MultiCandidateRequestPageContent />
          </>
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default memo(MultiCandidateRequestPage);
