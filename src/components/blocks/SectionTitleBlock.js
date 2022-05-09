import React, {memo} from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import RequestFormGridContainer from "../requestFormWrapper/RequestFormGridContainer";

const SectionTitleBlock = ({title, subtitle, children}) => {
  return (
    <RequestFormGridContainer item container>
      <Grid item xs={12}>
        <Typography component={"div"}>
          <Box fontWeight={600}> {title} </Box>
        </Typography>
        {subtitle && <Typography variant="subtitle2">{subtitle}</Typography>}
      </Grid>
      {children}
    </RequestFormGridContainer>
  );
};

export default memo(SectionTitleBlock);
