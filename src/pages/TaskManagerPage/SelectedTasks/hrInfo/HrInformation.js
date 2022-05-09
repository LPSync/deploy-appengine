import React, {memo, useEffect} from "react";
import {Box} from "@material-ui/core";
import HrTerminationCodeContainer from "./HrTerminatonCodeContainer";
import HrTerminationTypeContainer from "./HrTerminatonTypeContainer";
import HrPayrollNotesContainer from "./HrPayrollNotesContainer";
import HrDateContainer from "./HrDateContainer";
import HrDateTimezoneInfoContainer from "./HrDateTimezoneInfoContainer";
import HrPayrollDateTimeContainer from "./HrPayrollDateTimeContainer";
import HrTimeZoneContainer from "./HrTimeZoneContainer";
import HrButtonSubmit from "./HrButtonSubmit";
import {useDispatch, useSelector} from "react-redux";
import {
  clearHrInformation,
  setHrInformation,
} from "../../../../data/redux/taskManagerHrInfo/taskManagerHrInfoActions";

const HrInformation = () => {
  const dispatch = useDispatch();
  const offboardingTask = useSelector(
    (state) => state?.taskManager?.get("selectedTaskData")?.offboardingTask
  );
  useEffect(() => {
    dispatch(clearHrInformation());
  }, []);

  useEffect(() => {
    if (offboardingTask) {
      const {
        hrTerminationCode,
        hrTerminationType,
        payrollEndDateTime,
        payrollEpochTime,
        payrollEndTimezone,
        payrollNote,
      } = offboardingTask || {};
      dispatch(
        setHrInformation({
          hrTerminationCode,
          hrTerminationType,
          hrSelectedDate: payrollEndDateTime,
          hrPayrollEpoch: payrollEpochTime,
          hrTimeZoneId: payrollEndTimezone,
          hrNotes: payrollNote,
        })
      );
    }
  }, [offboardingTask]);

  return (
    <Box mt={3}>
      <HrTerminationCodeContainer />
      <Box mt={2}>
        <HrTerminationTypeContainer />
      </Box>
      <Box mt={2}>
        <HrPayrollDateTimeContainer>
          <HrDateContainer />

          <HrTimeZoneContainer />
        </HrPayrollDateTimeContainer>
      </Box>
      <Box mt={2}>
        <HrDateTimezoneInfoContainer />
      </Box>
      <Box mt={2}>
        <HrPayrollNotesContainer />
      </Box>
      <HrButtonSubmit />
    </Box>
  );
};

export default memo(HrInformation);
