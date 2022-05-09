import React from "react";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import CommentsInput from "./CommentsInput";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "30ch",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
}));

const AdditionalInformation = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant="subtitle1"
            className={classes.leftText}
          >
            Comments
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box className={classes.box}>
            <CommentsInput />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AdditionalInformation;
