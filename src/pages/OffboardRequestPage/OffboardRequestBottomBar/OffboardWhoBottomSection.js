import React, {memo} from "react";
import {Box, Grid, makeStyles, Typography} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import BottomSectionTitle from "./BottomSectionTitle";
import UserImg from "../../../components/UserImg";
import BottomSectionWrapper from "./BottomSectionWrapper";
import { useSelector } from "react-redux";
import { getInOffboardingRequest } from "../OffboardRequestPageContent";

const useStyles = makeStyles(() => ({
  box: {display: "flex", alignItems: "center"},
}));

const OffboardWhoBottomSection = () => {
  const classes = useStyles();
  const selectedOffboardUser = useSelector(getInOffboardingRequest(["offboardDetails", "selectedOffboardUser"]));
  const {email, firstName, lastName, jobTitle, location} = selectedOffboardUser?.profile || {};

  return (
    <BottomSectionWrapper xs={2}>
      <BottomSectionTitle title={"Offboard Who"}>
        <PersonIcon />
      </BottomSectionTitle>
      <Grid Item>
        <Box className={classes.box}>
          <UserImg small email={email} />
          <Box>
            <Typography>
              <strong>
                {firstName}{" "}
                {lastName}
              </strong>
            </Typography>
            <Typography variant={"subtitle2"}>
              {jobTitle}
            </Typography>
            <Typography variant={"subtitle2"}>
              {location}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </BottomSectionWrapper>
  );
};

export default memo(OffboardWhoBottomSection);
