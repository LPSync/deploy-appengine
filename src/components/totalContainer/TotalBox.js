import React, { memo } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  totalBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },

  totalNum: {
    fontSize: "1.7rem",
  },
  totalNumTitle: {
    fontSize: ".8rem",
  },
}));

const TotalBox = ({ totalNum, totalNumTitle }) => {
  const classes = useStyles();

  return (
    <Box className={classes.totalBox}>
      <div>
        <Typography component={"div"} className={classes.totalNum}>
          {totalNum}
        </Typography>
      </div>

      <div>
        <Typography component={"div"} className={classes.totalNumTitle}>
          {totalNumTitle}
        </Typography>
      </div>
    </Box>
  );
};

export default memo(TotalBox);
