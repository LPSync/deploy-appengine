import React, { forwardRef, memo } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import BadgeChip from "./BadgeChip";

const useStyles = makeStyles(() => ({
  badgeGroupBox: {
    textAlign: "left",
  },
  badgeGroupTitle: {
    fontSize: "0.875rem",
  },
  badgeLabel: {
    fontSize: "0.75rem",
  },
}));

const BadgeGroupItem = forwardRef(({ badges, title, ...props }, ref) => {
  const classes = useStyles();

  if(!badges?.length){
    return null;
  }
  return (
    <Box className={classes.badgeGroupBox} ref={ref} {...props}>
      <Typography component="span" className={classes.badgeGroupTitle}>
        {title}:
      </Typography>
      <span>
        {badges?.map((bge) => (
          <BadgeChip
            tooltip
            key={bge.badge?.id}
            id={bge.badge?.id}
            label={bge.badge?.badgeName}
            image={bge?.badge?.badgeIcon?.badgeIconImg}
            size="small"
            classes={{ label: classes.badgeLabel }}
          />
        ))}
      </span>
    </Box>
  );
});

export default memo(BadgeGroupItem);
