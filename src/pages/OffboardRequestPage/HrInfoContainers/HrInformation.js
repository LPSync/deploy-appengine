import React, {memo} from "react";
import {Box} from "@material-ui/core";
import RequestFormWrapper from "../../../components/requestFormWrapper/RequestFormWrapper";
import SectionTitleBlock from "../../../components/blocks/SectionTitleBlock";
import HrTerminationCodeContainer from "./HrTerminationCodeContainer";
import HrTerminationTypeContainer from "./HrTerminationTypeContainer";
import HrPayrollDateTimeContainer from "./HrPayrollDateTimeContainer";
import HrDateContainer from "./HrDateContainer";
import HrTimeZoneContainer from "./HrTimeZoneContainer";
import HrDateTimezoneInfoContainer from "./HrDateTimezoneInfoContainer";
import HrPayrollNotesContainer from "./HrPayrollNotesContainer";

const HrInformation = () => {
  return (
    <RequestFormWrapper>
      <SectionTitleBlock title="HR/Payroll Information" subtitle={"(optional)"}>
        <HrTerminationCodeContainer />
        <HrTerminationTypeContainer />
        <HrPayrollDateTimeContainer>
          <Box mr={2}>
            <HrDateContainer />
          </Box>
          <HrTimeZoneContainer />
          <HrDateTimezoneInfoContainer />
        </HrPayrollDateTimeContainer>
        <HrPayrollNotesContainer />
      </SectionTitleBlock>
    </RequestFormWrapper>
  );
};

export default memo(HrInformation);
