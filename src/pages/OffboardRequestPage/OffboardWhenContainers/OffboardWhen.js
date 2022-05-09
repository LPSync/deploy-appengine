import React, {memo} from "react";
import {connect} from "react-redux";
import {Divider} from "@material-ui/core";
import SectionTitleBlock from "../../../components/blocks/SectionTitleBlock";
import RequestFormWrapper from "../../../components/requestFormWrapper/RequestFormWrapper";
import ScheduleTypeSelectContainer from "./ScheduleTypeSelectContainer";
import ScheduleDateTimeInputContainer from "./ScheduleDateTimeInputContainer";
import NotificationCheckContainer from "./NotifyCheckContainer";

import TaskScheduleTypes from "../../../data/constants/TaskScheduleTypes";

const OffboardWhen = ({scheduleType}) => {
  return (
    <RequestFormWrapper>
      <SectionTitleBlock title="When to offboard?">
        <ScheduleTypeSelectContainer />
        {(scheduleType === TaskScheduleTypes.SCHEDULED ||
          scheduleType === TaskScheduleTypes.SENSITIVE) && (
          <>
            <ScheduleDateTimeInputContainer />
            <Divider />
            <NotificationCheckContainer />
          </>
        )}
      </SectionTitleBlock>
    </RequestFormWrapper>
  );
};

export default connect((state) => ({
  scheduleType: state.offboardRequest.getIn(["taskScheduling", "scheduleType"]),
}))(memo(OffboardWhen));
