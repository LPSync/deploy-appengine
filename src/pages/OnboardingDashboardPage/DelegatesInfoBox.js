import React, {memo} from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";
import PaperCardWrapper from "../../components/PaperCardWrapper";
import InfoIcon from "@material-ui/icons/Help";
import DelegateChip from "../../components/chips/DelegateChip";

const useStyles = makeStyles(() => ({
  box: {
    display: "flex",
  },
  chip: {
    fontSize: ".75rem",
  },
}));

const DelegatesInfoBox = ({delegateData}) => {
  const classes = useStyles();
  return (
    <PaperCardWrapper>
      <Box className={classes.box}>
        <Box mr={2}>
          <InfoIcon />
        </Box>
        <Box>
          <Typography component={"div"} variant="p">
            You are also managing onboarding tasks for the following:
            {delegateData?.map((delegate) => (
              <DelegateChip
                delegate={delegate}
                key={delegate?.id}
                className={classes.chip}
              />
            ))}
          </Typography>
        </Box>
      </Box>
    </PaperCardWrapper>
  );
};

export default memo(DelegatesInfoBox);
