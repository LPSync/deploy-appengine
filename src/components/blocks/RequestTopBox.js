import React, { memo } from "react";
import { Box, Typography } from "@material-ui/core";
import TopTypography from "../typographies/TopTypography";

const RequestTopBox = ({ review, reviewText, summaryText }) => {
  return (
    <Box>
      <TopTypography>{review ? reviewText : summaryText}</TopTypography>

      {review &&
      <Typography component={"div"} variant="body2">
        Please review and ensure that all of the information is correct.
        You must click the CONFIRM button to finalize your response.
      </Typography>
      }
    </Box>
  );
};

export default memo(RequestTopBox);