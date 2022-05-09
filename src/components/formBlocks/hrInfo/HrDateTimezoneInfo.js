import React, { memo } from "react";
import { Box } from "@material-ui/core";

const HrDateTimezoneInfo = ({timeZone, city}) => {
  return (
    <>
      {timeZone && (
        <Box mb={3} mx={5}>
          <p>The time zone of {city} is {timeZone}</p>
        </Box>
      )}
    </>
  );
};

export default memo(HrDateTimezoneInfo);
