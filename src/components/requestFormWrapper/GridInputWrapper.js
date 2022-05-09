import React, {memo} from "react";
import {Grid, makeStyles} from "@material-ui/core";
import RequestFormTypography from "../typographies/RequestFormTypography";

const useStyles = makeStyles(() => ({
  inputWrapperContainer: {
    margin: "16px 0 24px",
    paddingRight: 40,
  },
  inputWrapperLabel: {
    alignSelf: "center",
  },
}));

const GridInputWrapper = ({
  title,
  children,
  gridInput,
  inputWrapperContainerStyle,
  inputWrapperLabelStyle,
  xsItemChild,
}) => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      className={inputWrapperContainerStyle && classes.inputWrapperContainer}
    >
      <Grid
        item
        xs={4}
        className={inputWrapperLabelStyle && classes.inputWrapperLabel}
      >
        <RequestFormTypography title={title} />
      </Grid>
      <Grid item xs={xsItemChild ? xsItemChild : 8} {...gridInput}>
        {children}
      </Grid>
    </Grid>
  );
};

export default memo(GridInputWrapper);
