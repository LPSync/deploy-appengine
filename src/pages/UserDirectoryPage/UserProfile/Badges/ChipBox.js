import React from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";
import ColorBorderBox from "../../../../components/blocks/ColorBorderBox";
import BadgeChip from "../../../../components/badges/BadgeChip";

const useStyles = makeStyles(() => ({
  badgeTitleBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
}));

const ChipBox = ({badgeTitle, data}) => {
  const classes = useStyles();

  return (
    <Box m={2}>
      <Box className={classes.badgeTitleBox}>
        <Typography>{badgeTitle}</Typography>
        <Typography variant={"subtitle1"}>Total: {data?.length}</Typography>
      </Box>
      {data.length > 0 && (
        <ColorBorderBox height={100}>
          {data?.map((bge) => (
            <BadgeChip
              tooltip
              key={bge.badge?.id}
              id={bge.badge?.id}
              label={bge.badge?.badgeName}
              image={bge.badge?.badgeIcon.badgeIconImg}
            />
          ))}
        </ColorBorderBox>
      )}
    </Box>
  );
};

export default ChipBox;
