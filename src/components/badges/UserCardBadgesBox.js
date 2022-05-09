import React, { createRef, memo, useCallback, useEffect, useState } from "react";
import LoadingCircle from "../circularProgress/LoadingCircle";
import { Box, makeStyles } from "@material-ui/core";
import TopBadges from "./TopBadges";
import BadgeMenu from "./BadgeMenu";
import { getGroupedBadges } from "../../data/helper/helpers";
import BadgeTypes from "../../data/constants/BadgeTypes";
import { toSetArray } from "../../data/helper/commonFunctions";

const useStyles = makeStyles(() => ({
  badgesBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 2,
    marginBottom: 8,
  },
}));

const unwrap = (...list) => (object) => {
  return Object.fromEntries(new Map(Object.entries(object)?.filter(([key, value]) => list?.includes(key))));
};

const UserCardBadgesBox = ({ badges, loading, id, ...props }) => {
  const ref = createRef();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState();
  const [filteredBadges, setFilteredBadges] = useState();
  const [topBadgesTypes, setTopBadgesTypes] = useState();
  const [hoveredBadgeType, setHoveredBadgeType] = useState();

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleHover = useCallback(badgeType => {
    setHoveredBadgeType(badgeType);
    setAnchorEl(document?.getElementById(id));
  }, [badges, id]);

  useEffect(() => {
    if (badges?.length) {
      const groupedBadges = getGroupedBadges(badges, ([key, value]) => value?.length);
      const badgeTypes = toSetArray(Object.keys(groupedBadges)?.map(type =>
        (type === BadgeTypes.TOVUTI)
          ? BadgeTypes.SUBJECT_MATTER_EXPERT : type),
      );
      setTopBadgesTypes(badgeTypes);
      setFilteredBadges(groupedBadges);
    }
  }, [badges, setFilteredBadges, setTopBadgesTypes]);

  if (loading) {
    return <LoadingCircle size={30} />;
  }
  if (!filteredBadges || !Object.keys(filteredBadges)?.length) {
    return null;
  }
  return (
    <Box className={classes.badgesBox}>
      <TopBadges
        badgesTypes={topBadgesTypes}
        handleHover={handleHover}
        id={id}
        {...props}
      />
      {anchorEl && hoveredBadgeType && (
        <>
          {hoveredBadgeType === BadgeTypes.SUBJECT_MATTER_EXPERT ?
            <BadgeMenu
              ref={ref}
              anchorEl={anchorEl}
              handleClose={handleClose}
              badgesTypes={unwrap(BadgeTypes.SUBJECT_MATTER_EXPERT, BadgeTypes.TOVUTI)(filteredBadges)}
            />
            : <BadgeMenu
              ref={ref}
              anchorEl={anchorEl}
              handleClose={handleClose}
              badgeType={hoveredBadgeType}
              badges={filteredBadges?.[hoveredBadgeType]}
            />
          }
        </>
      )}
    </Box>
  );
};

export default memo(UserCardBadgesBox);