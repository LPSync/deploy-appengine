import React, { memo, useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import BadgeTypes from "../../../../data/constants/BadgeTypes";
import { getGroupedBadges } from "../../../../data/helper/helpers";
import UserStarIcon from "./UserStarBadge";
import UserKnowledgeBadge from "./UserKnowledgeBadge";
import UserManagerOrICBadge from "./UserManagerOrICBadge";

const getTenureYears = (startingDate, endingDate = Date.now()) => {
  const startingTimestamp = new Date(startingDate)?.getTime();
  const endTimeStamp = new Date(endingDate)?.getTime();
  const timeDifference = endTimeStamp - startingTimestamp;
  return Math.abs(new Date(timeDifference)?.getUTCFullYear() - 1970);
};

const UserProfileBadges = () => {
  const [tenureYears, setTenureYears] = useState();
  const [numberOfBadges, setNumberOfBadges] = useState();
  const [groupedBadges, setGroupedBadges] = useState();


  const userEmployeeSince = useSelector(state => state?.userDirectory?.get("userData")?.profile?.employeeSince);
  const userDirectReports = useSelector(state => state?.userDirectory?.get("userDirectReports"));
  const userBadges = useSelector(state => state?.userDirectory?.get("userBadges"));

  useEffect(() => {
    if (userBadges?.length) {
      const knowledgeBadges = getGroupedBadges(userBadges, ([key, value]) =>
        key === BadgeTypes.SUBJECT_MATTER_EXPERT
        || key === BadgeTypes.TOVUTI);
      setGroupedBadges(knowledgeBadges);
      setNumberOfBadges(
        knowledgeBadges?.[BadgeTypes.TOVUTI]?.length +
        knowledgeBadges?.[BadgeTypes.SUBJECT_MATTER_EXPERT]?.length,
      );
    }
  }, [userBadges]);

  useEffect(() => {
    if (userEmployeeSince) {
      const years = getTenureYears(userEmployeeSince);
      setTenureYears(years);
    }
  }, [userEmployeeSince]);

  return (
    <Box mt={1}>
      {tenureYears != null && <UserStarIcon tenureYears={tenureYears}/>}

      {userDirectReports && <UserManagerOrICBadge isManager={userDirectReports.length > 0}/>}

      {numberOfBadges > 0 && <UserKnowledgeBadge numberOfBadges={numberOfBadges} groupedBadges={groupedBadges}/>}
    </Box>
  );
};

export default memo(UserProfileBadges);