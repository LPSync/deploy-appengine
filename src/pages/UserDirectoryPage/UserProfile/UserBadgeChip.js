import React, { createRef, memo } from "react";
import { Tooltip } from "@material-ui/core";
import BadgeIcon from "../../../components/badges/BadgeIcon";
import ConditionalWrapper from "../../../components/ConditionalWrapper";

const UserBadgeChip = ({ tooltipTitle, ...props }) => {
  const ref = createRef();

  return (
    <ConditionalWrapper
      condition={tooltipTitle}
      wrapper={children =>
        <Tooltip title={tooltipTitle} placement="bottom">
          {children}
        </Tooltip>
      }
    >
      <BadgeIcon ref={ref} {...props} />
    </ConditionalWrapper>
  );
};

export default memo(UserBadgeChip);