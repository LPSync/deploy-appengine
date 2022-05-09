import React, { memo } from "react";
import { Box, Typography } from "@material-ui/core";
import ColorBorderBox from "../blocks/ColorBorderBox";
import BadgeChip from "./BadgeChip";

const SelectedBadgeChipsBox = ({badges, handleDelete}) => {
  return (
    <Box mt={2}>
      <Typography>
        <strong>Selected Badges:</strong>
      </Typography>

      <ColorBorderBox height={200} width={"95%"}>
        {badges?.map((bge) => (
          <BadgeChip
            key={bge.badge?.id}
            id={bge?.id}
            label={bge?.badgeName}
            image={bge?.badgeIcon?.badgeIconImg}
            onDelete={() => handleDelete(bge)}
          />
        ))}
      </ColorBorderBox>
    </Box>
  );
};

export default memo(SelectedBadgeChipsBox);
