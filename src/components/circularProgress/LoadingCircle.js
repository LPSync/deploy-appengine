import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: "1rem",
  },
}));

const CircularIndeterminate = ({ text, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" {...props}/>
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
};

export default memo(CircularIndeterminate);
