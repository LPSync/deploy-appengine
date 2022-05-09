import React, {memo} from "react";
import {Grid} from "@material-ui/core";
import GridItem from "./GridItem";

const RequestSummaryItem = ({name, value}) => {
  return (
    <>
      <Grid item xs={1} />
      <GridItem xs={3}> {name} </GridItem>
      <GridItem xs={8}> {value} </GridItem>
    </>
  );
};

export default memo(RequestSummaryItem);
