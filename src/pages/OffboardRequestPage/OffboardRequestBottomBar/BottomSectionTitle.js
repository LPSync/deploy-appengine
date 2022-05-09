import React, {memo} from "react";
import {Box, Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
  box: {display: "flex", alignItems: "center"},
});

const BottomSectionTitle = ({children, title}) => {
  const classes = useStyles();
  return (
    <Grid item>
      <Box className={classes.box}>
        <Box>{children}</Box>
        <Box ml={1}>
          <Typography variant={"body2"}>
            <strong>{title}</strong>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default memo(BottomSectionTitle);
