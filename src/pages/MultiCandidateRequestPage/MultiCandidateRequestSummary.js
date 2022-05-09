import React, {memo} from "react";
import PaperCardWrapper from "../../components/PaperCardWrapper";
import SummaryTopTypography from "../../components/typographies/TopTypography";
import {Box} from "@material-ui/core";
import MultiCandidateDetails from "./components/MultiCandidateDetails";

const MultiCandidateRequestSummary = ({review}) => {
  return (
    <PaperCardWrapper>
      <Box>
        <SummaryTopTypography>
          {review ? "Review Users to be Onboarded" : "Request Completed"}
        </SummaryTopTypography>
        <MultiCandidateDetails/>
      </Box>
    </PaperCardWrapper>
  );
};

export default memo(MultiCandidateRequestSummary);
