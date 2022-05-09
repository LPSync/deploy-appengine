import React, {memo} from "react";
import {makeStyles, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.2rem",
    fontWeight: theme.typography.fontWeightBold,
  },
  blackText: {color: theme.palette.text.primary},
  whiteText: {color: theme.palette.primary.main},
  toolbarGutters: {
    paddingRight: 12,
    paddingLeft: 8,
    [theme.breakpoints.up("sm")]: {
      paddingRight: 12,
      paddingLeft: 8,
    },
    [theme.breakpoints.up("xl")]: {
      paddingRight: 24,
      paddingLeft: 24,
    },
  },
}));

const ToolbarTypography = ({title, white}) => {
  const classes = useStyles();

  return (
    <Toolbar classes={{gutters: classes.toolbarGutters}}>
      <Typography
        className={`${classes.title} ${
          white ? classes.whiteText : classes.blackText
        }`}
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
    </Toolbar>
  );
};

export default memo(ToolbarTypography);
