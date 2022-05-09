import { Grid, makeStyles } from "@material-ui/core";
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const GridItem = ({ ...props }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      className={classes.gridItem}
      {...props}
    />
  )
}

export default memo(GridItem);