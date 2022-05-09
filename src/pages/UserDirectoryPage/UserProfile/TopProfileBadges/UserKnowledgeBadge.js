import React, {memo, useCallback, useState} from "react";
import UserBadgeChip from "../UserBadgeChip";
import BadgeMenu from "../../../../components/badges/BadgeMenu";
import {trailingS} from "../../../../data/helper/helpers";
import KnowledgeIcon from "./KnowledgeIcon";

const id = "user-knowledge-badges";

const getKnowledgeBadge = (numberOfBadges) => {
  if (numberOfBadges < 6) return <KnowledgeIcon color={"#cd7f32"} />;
  if (numberOfBadges < 16) return <KnowledgeIcon color={"#95CBE5"} />;
  if (numberOfBadges >= 16) return <KnowledgeIcon color={"#FA772E"} />;
};

const getKnowledgeTooltip = (numberOfBadges) => {
  if (numberOfBadges < 6)
    return `Novice. ${numberOfBadges} badge${trailingS(numberOfBadges)}`;
  if (numberOfBadges < 16) return `Advanced. ${numberOfBadges} badges`;
  if (numberOfBadges >= 16) return "Expert. More then 15 badges";
};

const UserKnowledgeBadge = ({numberOfBadges, groupedBadges}) => {
  const [anchorEl, setAnchorEl] = useState();

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleHover = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  return (
    <>
      <UserBadgeChip
        id={id}
        tooltipTitle={getKnowledgeTooltip(numberOfBadges)}
        icon={getKnowledgeBadge(numberOfBadges)}
        onClick={handleHover}
      />
      {anchorEl && groupedBadges && (
        <BadgeMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          badgesTypes={groupedBadges}
        />
      )}
    </>
  );
};

export default memo(UserKnowledgeBadge);
