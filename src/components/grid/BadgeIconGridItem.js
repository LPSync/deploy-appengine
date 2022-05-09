import React, { memo } from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import BadgeIcon from "../badges/BadgeIcon";

const useStyles = makeStyles((theme) => ({
  gridItemBox: {
    border: "2px solid transparent",
    borderRadius: "5px",
    padding: ".2rem",
    width: "5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "content-box",
    "&:hover": {
      border: "2px solid " + theme.palette.warning.main,
      cursor: "pointer",
    },
  },
  badgeName:{
    textAlign: "center"
  }
}));

const BadgeIconGridItem = ({ image, name, ...props }) => {
  const classes = useStyles();

  return (
    <Grid item {...props}>
      <Box className={classes.gridItemBox}>
        <BadgeIcon image={image} />
        <Typography variant={"subtitle1"} className={classes.badgeName}>{name}</Typography>
      </Box>
    </Grid>
  );
};

export default memo(BadgeIconGridItem);
