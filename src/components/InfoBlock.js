import {memo} from "react";
import {Box, makeStyles, Paper} from "@material-ui/core";
import {Help, Info} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  info: {
    backgroundColor: theme.palette.primary.light,
    display: "flex",
    alignItems: "center",
    padding: "0.5em 0.75em 0.5em",
  },
  infoIcon: {
    margin: "0.5em 0.25em",
  },
  infoSmallIcon: {
    margin: "0.2em 0.1em",
  },
}));

const InfoBlock = ({children, type, mb, small, ...props}) => {
  const classes = useStyles();
  const marginBottom = mb >= 0 ? mb : 2;
  return (
    <Box mb={marginBottom} {...props}>
      <Paper className={classes.info}>
        {type === "info" ? (
          <Info className={small ? classes.infoSmallIcon : classes.infoIcon} />
        ) : (
          <Help className={small ? classes.infoSmallIcon : classes.infoIcon} />
        )}
        {children}
      </Paper>
    </Box>
  );
};

export default memo(InfoBlock);
