import React, {memo} from "react";
import {Box, Divider} from "@material-ui/core";
import RequisitionDetails from "./RequisitionDetails";
import CostCenter from "./CostCenter";
import AdditionalInformation from "./AdditionalInformation";
import JobFinanceDetails from "./JobFinanceDetails";
import RequestFormWrapper from "../../../components/requestFormWrapper/RequestFormWrapper";
import SectionTitleBlock from "../../../components/blocks/SectionTitleBlock";
import TopTypography from "../../../components/typographies/TopTypography";
import SubtitleTypography from "../../../components/typographies/SubtitleTypography";

const CreateRequisitionRequestForm = () => {
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

      <SectionTitleBlock title="Cost Center">
        <CostCenter />
      </SectionTitleBlock>

      <Divider />

      <SectionTitleBlock title="Job/Finance Details">
        <JobFinanceDetails />
      </SectionTitleBlock>

      <Divider />

      <SectionTitleBlock title="Additional Information">
        <AdditionalInformation />
      </SectionTitleBlock>
    </RequestFormWrapper>
  );
};

export default memo(CreateRequisitionRequestForm);
