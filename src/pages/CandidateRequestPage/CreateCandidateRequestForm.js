import React, {memo} from "react";
import {Box, Divider} from "@material-ui/core";
import RequestFormWrapper from "../../components/requestFormWrapper/RequestFormWrapper";
import SectionTitleBlock from "../../components/blocks/SectionTitleBlock";
import AdditionalInformationContainers from "./AdditionalInformationContainers";
import CandidateDetailsContainers from "./CandidateDetailsContainers";
import RequisitionDetails from "./RequisitionDetailsContainers";
import TopTypography from "../../components/typographies/TopTypography";
import SubtitleTypography from "../../components/typographies/SubtitleTypography";

const CreateCandidateRequestForm = () => {
  return (
    <RequestFormWrapper>
      <Box>
        <TopTypography>{"Create Request"}</TopTypography>
        <SubtitleTypography>
          All fields marked with * are required.
        </SubtitleTypography>
      </Box>
      <SectionTitleBlock title="Requisition Details">
        <RequisitionDetails />
      </SectionTitleBlock>

      <Divider />

      <SectionTitleBlock title="Candidate Details">
        <CandidateDetailsContainers />
      </SectionTitleBlock>

      <Divider />

      <SectionTitleBlock title="Additional Information">
        <AdditionalInformationContainers />
      </SectionTitleBlock>
    </RequestFormWrapper>
  );
};

export default memo(CreateCandidateRequestForm);
