import {Box, makeStyles, Toolbar, Typography} from "@material-ui/core";
import React, {memo} from "react";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "1.15rem",
    fontWeight: 600,
  },
  headingToolbar: {
    backgroundColor: theme.palette.secondary.light,
    borderBottom: "1px solid " + theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },
}));

const TaskHeadingToolbar = ({title, children}) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.headingToolbar}>
      <div>
        <Typography component={"div"} className={classes.heading}>
          {title}
        </Typography>
      </div>
      <Box flexGrow={1} />

      {children}
    </Toolbar>
  );
};

export default memo(TaskHeadingToolbar);
